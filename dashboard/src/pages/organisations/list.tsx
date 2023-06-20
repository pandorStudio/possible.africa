import React, { useEffect, useRef, useState } from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useExport,
  useImport,
  useCreate,
  useApiUrl,
  file2Base64,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  TagField,
  EmailField,
  ImportButton,
  ExportButton,
  CreateButton,
  DeleteButton,
  RefreshButton,
  ImageField,
} from "@refinedev/antd";
import {
  Table,
  Space,
  Button,
  Input,
  Spin,
  Alert,
  message,
  Modal,
  Checkbox,
} from "antd";
import { IPost, IPostFile } from "../../interfaces";
import papa from "papaparse";
import { dataProvider } from "../../custom-data-provider/data-provider";
import axios from "axios";
import { axiosInstance } from "../../authProvider";
import Link from "antd/es/typography/Link";
import { useRefineContext } from "@pankod/refine";
import { useInvalidate } from "@refinedev/core";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { imageUploadHandler } from "../posts/create";
import FileSaver from "file-saver";
import { ShowButton } from "../../components/buttons/show";
import { ClickListPageElement } from "../../custom-components/ClickListPageElement";

interface IOrganisation {
  name: string;
  country: string;
  description: string;
  site_web: string;
  linkedin_url: string;
  facebook_url: string;
  twitter_url: string;
  logo: string;
}

const ENV = import.meta.env.VITE_NODE_ENV;
const API_URL =
  ENV === "developement"
    ? import.meta.env.VITE_BACKEND_DEV
    : import.meta.env.VITE_BACKEND_PROD;

export async function downloadMedia(mediaUrl) {
  try {
    const response = await axiosInstance.post(
      API_URL + "/organisations/getBuff",
      { url: mediaUrl },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const OrganisationList: React.FC<IResourceComponentsProps> = () => {
  const { triggerExport } = useExport({
    resource: "organisations",
  });
  const [importLoading, setImportLoading] = useState(false);
  const fileImportInput = useRef(null);
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  const apiUrl = useApiUrl();
  const [checkedArray, setCheckedArray] = useState([]);
  const [allCheckedOnPage, setAllCheckedOnPage] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modal, modalContextHolder] = Modal.useModal();
  const [pageCheckboxes, setPageCheckboxes] = useState([]);
  const [visibleCheckAll, setVisibleCheckAll] = useState(false);
  const invalidate = useInvalidate();
  let checkboxRefs = useRef([]);

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
              name: el[0],
              country: el[1],
              description: el[2],
              site_web: el[3],
              linkedin_url: el[4],
              facebook_url: el[5],
              twitter_url: el[6],
              logo: imageUrl ? imageUrl : "",
              type: el[8] === "Entreprise" ? "64511bd16054c5412224616b" : "", 
            };
            body.push({ ...ob });
            axiosInstance
              .post(
                apiUrl + "/organisations",
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
                console.log(response);
                setImportLoading(false);
              })
              .catch(function (error) {
                console.log(error);
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
    //@ts-ignore
    // setPageCheckboxes(document.querySelectorAll(".ant-table-row-checkbox"));
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
            return axiosInstance.delete(apiUrl + `/organisations/${ob}`, {
              headers: {
                "Content-Type": "application/json",
              },
            });
          });

          await Promise.all(results);
          console.log(results);
          invalidate({
            resource: "organisations",
            invalidates: ["list"],
          });
          setCheckedArray([]);
        }
      },
    });
  };

  return (
    <>
      {contextHolder}
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
              <Button
                type="primary"
                onClick={() => {
                  // log datas
                  if (tableProps?.dataSource) {
                    const data = tableProps?.dataSource.map((el: any) => {
                      return {
                        name: el.name,
                        country: el.country,
                        description: el.description,
                        site_web: el.site_web,
                        linkedin_url: el.linkedin_url,
                        facebook_url: el.facebook_url,
                        twitter_url: el.twitter_url,
                        logo: el.logo,
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
                        `organisations-${new Date()}-${Math.round(
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
              <CreateButton />
            </Space>
          ),
        }}
      >
        {modalContextHolder}
        {/* <Spin tip="Loading...">
          <Alert
            message="Import en cours..."
            description="Veuillez patienter pendant que nous importons les données."
            type="warning"import { axiosInstance } from './../../authProvider';
import { type } from './../../components/pages/auth/index';
import { ShowButton } from './../../components/buttons/show';

          />
        </Spin> */}
        <Table {...tableProps} rowKey="id" scroll={{ x: 2500, y: "auto" }}>
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
                width="3%"
                dataIndex="logo"
                title="Logo"
                render={(value: any) => {
                  if (value && !(value.split(".").pop() === "html")) {
                    return (
                      <ImageField style={{ maxWidth: "50px" }} value={value} />
                    );
                  } else {
                    return "-";
                  }
                }}
              />
              <Table.Column
                fixed="left"
                width="8%"
                dataIndex="name"
                title="Nom"
              />
              <Table.Column width="7%" dataIndex="country" title="Pays" />
              {/* <Table.Column
            width="10%"
            dataIndex="couverture"
            title="Couverture de l'organisation"
            render={(value: any) => {
              if (value) {
                return (
                  <ImageField style={{ maxWidth: "100px" }} value={value} />
                );
              } else {
                return "-";
              }
            }}
          /> */}
              <Table.Column dataIndex={["type", "name"]} title="Type" />
              <Table.Column
                dataIndex={["contributeur", "username"]}
                title="Contributeur"
              />
              <Table.Column dataIndex={"owner"} title="Contact" />
              {/* <Table.Column
            dataIndex="description"
            title="Description"
            render={(value: any) => {
              if (value && value.length > 60) {
                return value.substring(0, 60) + "...";
              } else if (value) {
                return value;
              } else {
                return "-";
              }
            }}
          /> */}
              <Table.Column
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
                ellipsis={true}
                dataIndex="telephone"
                title="Telephone"
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
                dataIndex="site_web"
                title="Site Web"
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
                dataIndex="linkedin_url"
                title="Url Linkedin "
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
                dataIndex="facebook_url"
                title="Url Facebook"
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
                dataIndex="twitter_url"
                title="Url Twitter"
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
                dataIndex="adresse"
                title="Adresse"
                render={(value: any) => {
                  if (value) {
                    return (
                      <Link
                        // href={"https://www.google.com/search?q=" + value}
                        href={"https://www.google.com/maps/search/" + value}
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
    </>
  );
};
