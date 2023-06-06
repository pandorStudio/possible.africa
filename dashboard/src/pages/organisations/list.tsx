import React, { useEffect, useRef, useState } from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useExport,
  useImport,
  useCreate,
  useApiUrl,
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
import { Table, Space, Button, Input, Spin, Alert, message } from "antd";
import { IOrganisation, IPost, IPostFile } from "../../interfaces";
import papa from "papaparse";
import { dataProvider } from "../../custom-data-provider/data-provider";
import axios from "axios";
import { axiosInstance } from "../../authProvider";
import Link from "antd/es/typography/Link";
import { useRefineContext } from "@pankod/refine";
import { useInvalidate } from "@refinedev/core";

export const OrganisationList: React.FC<IResourceComponentsProps> = () => {
  const [importLoading, setImportLoading] = useState(false);
  const fileImportInput = useRef(null);
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  const apiUrl = useApiUrl();
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
              owner: el[3],
              email: el[4],
              telephone: el[5],
              site_web: el[6],
              linkedin_url: el[7],
              facebook_url: el[8],
              twitter_url: el[9],
              adresse: el[10],
            };
            body.push({ ...ob });
            // await axios.post(apiUrl + "/organisations", el);
            setImportLoading(true);
            await axiosInstance
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
    let results = body.forEach(async (el) => {
      console.log(el);
      //await axios.put("http://localhost:5000", el);
    });

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
  }, [importLoading]);

  return (
    <>
      {contextHolder}
      <List
        headerProps={{
          extra: (
            <Space>
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
        {/* <Spin tip="Loading...">
          <Alert
            message="Import en cours..."
            description="Veuillez patienter pendant que nous importons les données."
            type="warning"
          />
        </Spin> */}
        <Table {...tableProps} rowKey="id" scroll={{ x: 2500, y: "auto" }}>
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
          <Table.Column
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
          />
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
      </List>
    </>
  );
};
