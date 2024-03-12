import React, { useEffect, useRef, useState } from "react";
import {
  BaseRecord,
  IResourceComponentsProps,
  useApiUrl,
  useGetIdentity,
  useInvalidate,
  useMany,
} from "@refinedev/core";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  EmailField,
  List,
  ShowButton,
  TagField,
  useTable,
} from "@refinedev/antd";
import {
  Avatar,
  Button,
  Checkbox,
  Input,
  message,
  Modal,
  Space,
  Table,
  Typography,
} from "antd";
import Link from "antd/es/typography/Link";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../custom-data-provider/data-provider";
import { downloadMedia } from "../organisations/list";
import { imageUploadHandler } from "../posts/create";
import papa from "papaparse";
import {
  Admin,
  AdminOrContributor,
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

  const { data: originCountriesData, isLoading: originCountriesIsLoading } =
    useMany({
      resource: "countries",
      ids: tableProps?.dataSource?.map((item) => item?.origin_countries) ?? [],
    });

  const { data: coveredCountriesData, isLoading: coveredCountriesIsLoading } =
    useMany({
      resource: "countries",
      ids: tableProps?.dataSource?.map((item) => item?.covered_countries) ?? [],
    });

  const { data: userTypesData, isLoading: userTypesIsLoading } = useMany({
    resource: "user_types",
    ids: tableProps?.dataSource?.map((item) => item?.categories) ?? [],
  });

  return (
    <>
      {contextHolder}
      {modalContextHolder}

      <List
        headerProps={{
          extra: (
            <Space>
              {checkedArray.length ? (
                <button
                  className="btn-primary"
                  onClick={confirmDelete}
                  style={{ backgroundColor: "#ff4d4f", color: "white" }}
                >
                  {`${checkedArray.length}`} Effacer Selection
                </button>
              ) : null}
              <Input
                type="file"
                ref={fileImportInput}
                onChange={handleImport}
              />
              <AdminOrContributor>
                <button
                  className="btn-primary"
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
                </button>
              </AdminOrContributor>

              <CreateButton
                className="btn-primary"
                style={{
                  backgroundColor: "#6cd9cb",
                }}
              />
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
                  ref={(input) => (checkboxRefs.current[record.id] = record.id)}
                  className="ant-table-row-checkbox"
                  onChange={() => handleCheckBox(event, record.id)}
                />
              );
            }}
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
          <Table.Column dataIndex="lastname" title="Nom" />
          <Table.Column dataIndex="firstname" title="Prénom" />
          {/*<Table.Column dataIndex="username" title="N. Utilisateur" />*/}
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
          <Table.Column
            dataIndex="categories"
            title="Categories"
            render={(value: any[]) =>
              userTypesIsLoading ? (
                <>Loading ...</>
              ) : (
                <>
                  {value?.map((item, index) => (
                    <TagField key={index} value={item?.name} />
                  ))}
                </>
              )
            }
          />
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
            dataIndex="origin_countries"
            title="Pays d'origine"
            render={(value: any[]) =>
              originCountriesIsLoading ? (
                <>Loading ...</>
              ) : (
                <>
                  {value?.map((item, index) => (
                    <TagField
                      key={index}
                      value={item?.translations?.fra?.common}
                    />
                  ))}
                </>
              )
            }
          />
          <Table.Column
            dataIndex="covered_countries"
            title="Pays couvert"
            render={(value: any[]) =>
              coveredCountriesIsLoading ? (
                <>Loading ...</>
              ) : (
                <>
                  {value?.map((item, index) => (
                    <TagField
                      key={index}
                      value={item?.translations?.fra?.common}
                    />
                  ))}
                </>
              )
            }
          />
          <Table.Column
            dataIndex="gender"
            title="Genre"
            render={(value: any) => {
              if (value) {
                return value === "m"
                  ? "Masculin"
                  : value === "f"
                  ? "Féminin"
                  : "Autre";
              } else {
                return "-";
              }
            }}
          />
          <Table.Column
            dataIndex="phone"
            title="Téléphone"
            render={(value: any) => {
              if (value) {
                return (
                  <Link
                    href={
                      "https://www.google.com/search?q=" +
                      value.indicatif +
                      " " +
                      value.number
                    }
                    target="_blank"
                  >
                    {value.indicatif} {value.number}
                  </Link>
                );
              } else {
                return "-";
              }
            }}
          />

          <Table.Column
            ellipsis={true}
            dataIndex="adresse"
            title="Email de contact"
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
            dataIndex="linkedin_profile"
            title="Linkedin (URL)"
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
            title="Twitter (URL)"
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
            dataIndex="facebook_profile"
            title="Facebook (URL)"
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
                <AdminOrContributor>
                  <EditButton hideText size="small" recordItemId={record.id} />
                </AdminOrContributor>
                <ShowButton hideText size="small" recordItemId={record.id} />
                <Admin>
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                  />
                </Admin>
              </Space>
            )}
          />
        </Table>

        <Space>
          {checkedArray.length ? (
            <button
              className="btn-primary"
              onClick={confirmDelete}
              style={{ backgroundColor: "#ff4d4f", color: "white" }}
            >
              {`${checkedArray.length}`} Effacer Selection
            </button>
          ) : null}
        </Space>
      </List>
    </>
  );
};
