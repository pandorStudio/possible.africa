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
  ShowButton,
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
import { IOrganisation, IPost, IPostFile } from "../../interfaces";
import papa from "papaparse";
import { dataProvider } from "../../custom-data-provider/data-provider";
import axios from "axios";
import { axiosInstance } from "../../authProvider";
import Link from "antd/es/typography/Link";
import { useRefineContext } from "@pankod/refine";
import { useInvalidate } from "@refinedev/core";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { imageUploadHandler } from "../posts/create";

const ENV = import.meta.env.VITE_NODE_ENV;
const API_URL =
  ENV === "developement"
    ? import.meta.env.VITE_BACKEND_DEV
    : import.meta.env.VITE_BACKEND_PROD;

async function downloadMedia(mediaUrl) {
  try {
    const response = await axios.get(mediaUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "arraybuffer",
    });

    const fileBuffer = Buffer.from(response.data, "binary");
    return fileBuffer;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function imageBfUploadHandler(blob: any) {
  // build form data
  // const blob = await bf.blob();
  const file = new File([blob], "image.jpg", {
    type: blob.type,
  });
  const data = new FormData();
  data.append("image", file);

  // send post request
  const response = await axiosInstance.post(`${API_URL}/upload/images`, data);

  // return the image url
  const imageUrl = response.data.url;
  // const imageUrl = `${API_URL}/uploads/images/${filename}`;

  return imageUrl;
}

export const OrganisationList: React.FC<IResourceComponentsProps> = () => {
  const [importLoading, setImportLoading] = useState(false);
  const fileImportInput = useRef(null);
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  const apiUrl = useApiUrl();
  const [checkedArray, setCheckedArray] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modal, modalContextHolder] = Modal.useModal();
  const invalidate = useInvalidate();

  async function handleImport(e: any) {
    const file = e.target.files[0];
    let headers: any[] = [];
    let body: any[] = [];
    papa.parse(file, {
      complete: async function (results) {
        results.data.map(async (el: any, i) => {
          if (i === 0) {
            headers.push(...el);
          } else {
            const ob: any = {
              name: el[0],
              country: el[1],
              description: el[2],
              site_web: el[3],
              linkedin_url: el[4],
              facebook_url: el[5],
              twitter_url: el[6],
              logo: el[7],
              // linkedin_url: el[7],
              // facebook_url: el[8],
              // twitter_url: el[9],
              // adresse: el[10],
            };
            body.push({ ...ob });
            // await axios.post(apiUrl + "/organisations", el);
            setImportLoading(true);
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
    console.log(body);
    const results = body.map(async (ob) => {
      return axiosInstance.post(
        apiUrl + "/organisations",
        {
          ...ob,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });

    await Promise.all(results);
    setImportLoading(false);

    console.log(results);
  }

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (importLoading) {
      messageApi.open({
        type: "loading",
        content: "Veuillez patienter pendant que nous importons les données.",
        duration: 0,
      });
    }
    if (!importLoading) {
      messageApi.destroy();
      invalidate({
        resource: "organisations",
        invalidates: ["list"],
      });
    }

    return () => {
      if (fileImportInput.current) {
        fileImportInput.current!.value! = "";
      }
    };
  }, [importLoading, checkedArray, deleteLoading]);

  function handleCheckBox(e: any, id: any) {
    const checked = e.target.checked;
    if (checked) {
      setCheckedArray((s) => {
        return [...s, id];
      });
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
              <ExportButton />
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

          />
        </Spin> */}
        <Table {...tableProps} rowKey="id" scroll={{ x: 2500, y: "auto" }}>
          <Table.Column
            fixed="left"
            width={68}
            dataIndex=""
            title="#"
            render={(_, record: BaseRecord) => {
              return (
                <Checkbox
                  key={record.id}
                  onChange={() => handleCheckBox(event, record.id)}
                />
              );
            }}
          />
          <Table.Column
            width="10%"
            dataIndex="name"
            title="Nom de l'organisation"
          />
          <Table.Column
            width="10%"
            dataIndex="country"
            title="Pays de l'organisation"
          />
          <Table.Column
            width="10%"
            dataIndex="logo"
            title="Logo de l'organisation"
            render={(value: any) => {
              if (value) {
                return (
                  <ImageField style={{ maxWidth: "100px" }} value={value} />
                );
              } else {
                return "-";
              }
            }}
          />
          <Table.Column
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
          />
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
            fixed="right"
            title="Actions"
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
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
