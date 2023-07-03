import React, { useEffect, useRef, useState } from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useApiUrl,
  useGetIdentity,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  EmailField,
  ImageField,
  DeleteButton,
  CreateButton,
} from "@refinedev/antd";
import {
  Table,
  Space,
  Avatar,
  Checkbox,
  Button,
  Alert,
  Modal,
  message,
  Input,
  Row,
  Col,
  Card,
  Typography,
} from "antd";
import Link from "antd/es/typography/Link";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../authProvider";
import { useInvalidate } from "@refinedev/core";
import { downloadMedia } from "../organisations/list";
import { imageUploadHandler } from "../posts/create";
import papa from "papaparse";
import {
  Admin,
  AdminOrContributor,
  Connected,
} from "../../custom-components/AccessControl";

type IUser = {
  id: number;
  name: string;
  role: string;
  roleSlug: string;
  username: string;
  lastname: string;
  firstname: string;
  avatar: string;
};

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const [importLoading, setImportLoading] = useState(false);
  const fileImportInput = useRef(null);
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  const [checkedArray, setCheckedArray] = useState([]);
  const [allCheckedOnPage, setAllCheckedOnPage] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modal, modalContextHolder] = Modal.useModal();
  const [pageCheckboxes, setPageCheckboxes] = useState([]);
  const [visibleCheckAll, setVisibleCheckAll] = useState(false);
  const invalidate = useInvalidate();
  let checkboxRefs = useRef([]);
  const { data: user } = useGetIdentity<any>();
  const [userConnected, setUserConnected] = useState<any>();

  const apiUrl = useApiUrl();

  const { Title, Text } = Typography;

  const [hideProfile, setHideProfile] = useState(true);

  useEffect(() => {
    // console.log(user);
    if (user) {
      // console.log(user);
      // Get all other user informations
      axiosInstance
        .get(apiUrl + "/users/" + user.id)
        .then((response) => {
          // console.log(response.data);
          setUserConnected(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [user]);

  async function handleImport(e: any) {
    const file = e.target.files[0];
    let headers: any[] = [];
    let body: any[] = [];
    setImportLoading(true);
    papa.parse(file, {
      complete: async function (results) {
        results.data.map(async (el: any, i) => {
          if (i === 0) {
            headers.push(...el);
          } else {
            const blobImage = await downloadMedia(el[7]);
            const imageUrl = await imageUploadHandler(blobImage.data.dataUrl);
            const ob: any = {
              username: el[0],
              avatar: el[1],
              email: el[2],
              firstname: el[3],
              lastname: el[4],
              description: el[5],
              slug: el[6],
              role: imageUrl ? imageUrl : "",
              gender: el[8],
              phone: el[9],
              address: el[10],
              facebook_profile: el[11],
              twitter_profile: el[12],
              linkedin_profile: el[13],
            };
            body.push({ ...ob });
            axiosInstance
              .post(
                apiUrl + "/users",
                {
                  ...ob,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                // console.log(response);
                setImportLoading(false);
              })
              .catch(function (error) {
                // console.log(error);
              });
          }
        });
      },
    });
  }

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (importLoading) {
      messageApi.open({
        type: "loading",
        content: "Veuillez patienter pendant que nous importons les données.",
        duration: 10000000,
      });
    }
    if (!importLoading) {
      messageApi.destroy();
      invalidate({
        resource: "organisations",
        invalidates: ["list"],
      });
    }
    if (checkedArray.length >= pageCheckboxes.length) {
      setAllCheckedOnPage(true);
    } else {
      setAllCheckedOnPage(false);
    }

    return () => {
      if (fileImportInput.current) {
        fileImportInput.current!.value! = "";
      }
    };
  }, [importLoading, checkedArray, deleteLoading, allCheckedOnPage]);

  function handleCheckBoxAll(e: any) {
    const checked = e.target.checked;
    if (checked) {
      tableProps?.dataSource?.map((el: any) => {
        if (checkboxRefs?.current[el.id]) {
          setCheckedArray((s) => {
            return [...s, el.id];
          });
        }
      });
      setAllCheckedOnPage(true);
    } else {
      setCheckedArray([]);
      setAllCheckedOnPage(false);
    }
  }

  function handleCheckBox(e: any, id: any) {
    //@ts-ignore
    setPageCheckboxes(document.querySelectorAll(".ant-table-row-checkbox"));
    const checked = e.target.checked;
    if (checked) {
      setCheckedArray((s) => {
        return [...s, id];
      });
      setVisibleCheckAll(true);
    } else {
      const checkedArrayCopy = [...checkedArray];
      checkedArrayCopy.filter((el, index) => {
        if (el === id) {
          checkedArrayCopy.splice(index, 1);
        }
      });
      setCheckedArray(checkedArrayCopy);
    }
  }

  const confirmDelete = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Êtes vous sur de vouloir supprimer les élements sélèctionnés ?",
      okText: "Supprimer",
      cancelText: "Annuler",
      async onOk(...args) {
        if (checkedArray.length) {
          const results = checkedArray.map(async (ob) => {
            return axiosInstance.delete(apiUrl + `/users/${ob}`, {
              headers: {
                "Content-Type": "application/json",
              },
            });
          });

          await Promise.all(results);
          // console.log(results);
          invalidate({
            resource: "users",
            invalidates: ["list"],
          });
          setCheckedArray([]);
        }
      },
    });
  };

  return (
    <Connected>
      <>
        {contextHolder}
        {modalContextHolder}
        {/* Build the me section */}

        {/* {userConnected ? (
          <Row
            gutter={[16, 16]}
            style={{
              marginBottom: 20,
            }}
          >
            <Col span={24}>
              <Card
                title="Mon Profil"
                extra={
                  <Button
                    onClick={() => {
                      // setModalVisible(true);
                      // setModalType("edit");
                    }}
                  >
                    Modifier
                  </Button>
                }
              >
                <Row gutter={[16, 16]}>
                  {hideProfile ? null : (
                    <>
                      <Col span={24}>
                        <Space direction="horizontal">
                          <Avatar size={100} src={userConnected?.avatar} />
                          <Space direction="vertical">
                            <Title
                              level={3}
                            >{`${userConnected?.firstname} ${userConnected?.lastname}`}</Title>
                            <Title level={4}>{userConnected?.username}</Title>
                          </Space>
                        </Space>
                      </Col>
                      <Col span={24}>
                        <Space
                          direction="horizontal"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            alignItems: "center",
                          }}
                        >
                          <Title level={4}>Email :</Title>
                          <Text
                            style={{
                              fontSize: 16,
                              display: "inline-block",
                              marginBottom: 10,
                              marginLeft: 20,
                            }}
                          >
                            {userConnected?.email || "-"}
                          </Text>
                        </Space>
                      </Col>
                      <Col span={24}>
                        <Space
                          direction="horizontal"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            alignItems: "center",
                          }}
                        >
                          <Title level={4}>Description :</Title>
                          <Text
                            style={{
                              fontSize: 16,
                              display: "inline-block",
                              marginBottom: 10,
                              marginLeft: 20,
                            }}
                          >
                            {userConnected?.description || "-"}
                          </Text>
                        </Space>
                      </Col>
                      <Col span={24}>
                        <Space
                          direction="horizontal"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            alignItems: "center",
                          }}
                        >
                          <Title level={4}>Role :</Title>
                          <Text
                            style={{
                              fontSize: 16,
                              display: "inline-block",
                              marginBottom: 10,
                              marginLeft: 20,
                            }}
                          >
                            {userConnected?.role?.name || "-"}
                          </Text>
                        </Space>
                      </Col>
                      <Col span={24}>
                        <Space
                          direction="horizontal"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            alignItems: "center",
                          }}
                        >
                          <Title level={4}>Genre :</Title>
                          <Text
                            style={{
                              fontSize: 16,
                              display: "inline-block",
                              marginBottom: 10,
                              marginLeft: 20,
                            }}
                          >
                            {userConnected?.gender === "m"
                              ? "Masculin"
                              : userConnected?.gender === "f"
                              ? "Féminin"
                              : "Autre"}
                          </Text>
                        </Space>
                      </Col>
                      <Col span={24}>
                        <Space
                          direction="horizontal"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            alignItems: "center",
                          }}
                        >
                          <Title level={4}>Téléphone :</Title>
                          <Text
                            style={{
                              fontSize: 16,
                              display: "inline-block",
                              marginBottom: 10,
                              marginLeft: 20,
                            }}
                          >
                            {userConnected?.phone || "-"}
                          </Text>
                        </Space>
                      </Col>
                      <Col span={24}>
                        <Space
                          direction="horizontal"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            alignItems: "center",
                          }}
                        >
                          <Title level={4}>Addresse :</Title>
                          <Text
                            style={{
                              fontSize: 16,
                              display: "inline-block",
                              marginBottom: 10,
                              marginLeft: 20,
                            }}
                          >
                            {userConnected?.address || "-"}
                          </Text>
                        </Space>
                      </Col>
                      <Col span={24}>
                        <Space
                          direction="horizontal"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            alignItems: "center",
                          }}
                        >
                          <Title level={4}>Profile Facebook :</Title>
                          <Text
                            style={{
                              fontSize: 16,
                              display: "inline-block",
                              marginBottom: 10,
                              marginLeft: 20,
                            }}
                          >
                            {userConnected?.facebook_profile || "-"}
                          </Text>
                        </Space>
                      </Col>
                      <Col span={24}>
                        <Space
                          direction="horizontal"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            alignItems: "center",
                          }}
                        >
                          <Title level={4}>Profile Twitter :</Title>
                          <Text
                            style={{
                              fontSize: 16,
                              display: "inline-block",
                              marginBottom: 10,
                              marginLeft: 20,
                            }}
                          >
                            {userConnected?.twitter_profile || "-"}
                          </Text>
                        </Space>
                      </Col>
                      <Col span={24}>
                        <Space
                          direction="horizontal"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            alignItems: "center",
                          }}
                        >
                          <Title level={4}>Profile Linkedin :</Title>
                          <Text
                            style={{
                              fontSize: 16,
                              display: "inline-block",
                              marginBottom: 10,
                              marginLeft: 20,
                            }}
                          >
                            {userConnected?.linkedin_profile || "-"}
                          </Text>
                        </Space>
                      </Col>
                    </>
                  )}

                  <Col span={24} style={{}}>
                    <Space
                      direction="horizontal"
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "right",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        style={{
                          margin: "auto",
                          width: "100%",
                        }}
                        type="primary"
                        onClick={() => {
                          setHideProfile(!hideProfile);
                        }}
                      >
                        {hideProfile
                          ? "Voir mon profile"
                          : "Cacher mon profile"}
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        ) : (
          <Col
            span={24}
            style={{
              display: "block",
              borderRadius: 10,
            }}
          >
            <Space
              direction="horizontal"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  display: "inline-block",
                  width: "100%",
                  backgroundColor: "#fff",
                  padding: 10,
                }}
              >
                Chargement du profil ...
              </Text>
            </Space>
          </Col>
        )} */}

        <Admin>
          <List
            headerProps={{
              extra: (
                <Space>
                  {checkedArray.length ? (
                    <Button
                      onClick={confirmDelete}
                      style={{ backgroundColor: "#ff4d4f", color: "white" }}
                    >
                      {`${checkedArray.length}`} Effacer Selection
                    </Button>
                  ) : null}
                  <Input
                    type="file"
                    ref={fileImportInput}
                    onChange={handleImport}
                  />
                  <AdminOrContributor>
                    <Button
                      type="primary"
                      onClick={() => {
                        // log datas
                        if (tableProps?.dataSource) {
                          const data = tableProps?.dataSource.map((el: any) => {
                            return {
                              username: el.username,
                              avatar: el.avatar,
                              email: el.email,
                              firstname: el.firstname,
                              lastname: el.lastname,
                              description: el.description,
                              role: el.role,
                              gender: el.gender,
                              phone: el.phone,
                              adresse: el.adresse,
                              facebook_profile: el.facebook_profile,
                              twitter_profile: el.twitter_profile,
                              linkedin_profile: el.linkedin_profile,
                            };
                          });
                          if (data) {
                            const csv = papa.unparse(data);
                            const blob = new Blob([csv], { type: "text/csv" });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.setAttribute("hidden", "");
                            a.setAttribute("href", url);
                            a.setAttribute(
                              "download",
                              `users-${new Date()}-${Math.round(
                                Math.random() * 99999999
                              )}.csv`
                            );
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                          }
                        }
                      }}
                    >
                      Exporter les données
                    </Button>
                  </AdminOrContributor>

                  <CreateButton />
                </Space>
              ),
            }}
          >
            {contextHolder}
            <Table {...tableProps} rowKey="_id" scroll={{ x: 2500, y: "auto" }}>
              <Table.Column
                fixed="left"
                width={68}
                dataIndex=""
                title={
                  visibleCheckAll ? (
                    <Checkbox
                      checked={allCheckedOnPage}
                      defaultChecked={false}
                      onChange={handleCheckBoxAll}
                    />
                  ) : (
                    "#"
                  )
                }
                render={(_, record: BaseRecord) => {
                  return (
                    <Checkbox
                      key={record.id}
                      checked={checkedArray.includes(record.id)}
                      ref={(input) =>
                        (checkboxRefs.current[record.id] = record.id)
                      }
                      className="ant-table-row-checkbox"
                      onChange={() => handleCheckBox(event, record.id)}
                    />
                  );
                }}
              />
              <Table.Column
                fixed="left"
                dataIndex="username"
                title="N. Utilisateur"
              />

              <Table.Column
                width={68}
                dataIndex="avatar"
                title="Profil"
                render={(value: any) => {
                  if (value) {
                    return <Avatar src={value} />;
                  } else {
                    return "-";
                  }
                }}
              />
              <Table.Column
                width="6%"
                ellipsis={true}
                dataIndex={["email"]}
                title="Email"
                render={(value: any) => {
                  if (value) {
                    return <EmailField value={value} />;
                  } else {
                    return "-";
                  }
                }}
              />
              <Table.Column dataIndex="firstname" title="Prénom.s" />
              <Table.Column dataIndex="lastname" title="N. Famille" />
              <Table.Column dataIndex="description" title="Description" />
              <Table.Column
                dataIndex="role"
                title="Role"
                render={(value: any) => {
                  if (value) {
                    return value?.name;
                  } else {
                    return "-";
                  }
                }}
              />
              <Table.Column
                dataIndex="gender"
                title="Genre"
                render={(value: any) => {
                  if (value) {
                    value === "m"
                      ? "Masculin"
                      : value === "f"
                      ? "Féminin"
                      : "Autre";
                  } else {
                    return "-";
                  }
                }}
              />
              <Table.Column dataIndex="phone" title="Tèl." />

              <Table.Column
                ellipsis={true}
                dataIndex="adresse"
                title="Adresse"
                render={(value: any) => {
                  if (value) {
                    return (
                      <Link
                        href={"https://www.google.com/search?q=" + value}
                        target="_blank"
                      >
                        {value}
                      </Link>
                    );
                  } else {
                    return "-";
                  }
                }}
              />
              <Table.Column
                ellipsis={true}
                dataIndex="facebook_profile"
                title="Profile Fb."
                render={(value: any) => {
                  if (value) {
                    return (
                      <Link href={value} target="_blank">
                        {value}
                      </Link>
                    );
                  } else {
                    return "-";
                  }
                }}
              />
              <Table.Column
                ellipsis={true}
                dataIndex="twitter_profile"
                title="Profile Tw."
                render={(value: any) => {
                  if (value) {
                    return (
                      <Link href={value} target="_blank">
                        {value}
                      </Link>
                    );
                  } else {
                    return "-";
                  }
                }}
              />
              <Table.Column
                ellipsis={true}
                dataIndex="linkedin_profile"
                title="Profile Li."
                render={(value: any) => {
                  if (value) {
                    return (
                      <Link href={value} target="_blank">
                        {value}
                      </Link>
                    );
                  } else {
                    return "-";
                  }
                }}
              />
              <Table.Column
                fixed="right"
                title="Actions"
                dataIndex="actions"
                render={(_, record: BaseRecord) => (
                  <Space>
                    <EditButton
                      hideText
                      size="small"
                      recordItemId={record.id}
                    />
                    <ShowButton
                      hideText
                      size="small"
                      recordItemId={record.id}
                    />
                    <DeleteButton
                      hideText
                      size="small"
                      recordItemId={record.id}
                    />
                  </Space>
                )}
              />
            </Table>

            <Space>
              {checkedArray.length ? (
                <Button
                  onClick={confirmDelete}
                  style={{ backgroundColor: "#ff4d4f", color: "white" }}
                >
                  {`${checkedArray.length}`} Effacer Selection
                </Button>
              ) : null}
            </Space>
          </List>
        </Admin>
      </>
    </Connected>
  );
};
