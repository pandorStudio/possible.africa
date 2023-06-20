import React, { useEffect, useRef, useState } from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useInvalidate,
  useApiUrl,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  BooleanField,
  DeleteButton,
  ExportButton,
  CreateButton,
} from "@refinedev/antd";
import { Table, Space, Input, message } from "antd";
import { axiosInstance } from "../../authProvider";
import papa from "papaparse";
import Link from "antd/es/typography/Link";

export const OpportunityList: React.FC<IResourceComponentsProps> = () => {
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
              title: el[0],
              beginning_date: el[1],
              ending_date: el[2],
              target_country: el[3],
              description: el[4],
              eligibility: el[5],
              processus: el[6],
              beneficies: el[7],
              registration_link: el[8],
              isRecurrent: el[9],
              frequency: el[10],
            };
            body.push({ ...ob });
            // await axios.post(apiUrl + "/organisations", el);
            setImportLoading(true);
            await axiosInstance
              .post(
                apiUrl + "/opportunities",
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
        resource: "opportunities",
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
        <Table {...tableProps} rowKey="id" scroll={{ x: 2500, y: "auto" }}>
          <Table.Column dataIndex="title" title="Titre" ellipsis={true} />
          <Table.Column dataIndex={["user", "username"]} title="Contributeur" />
          <Table.Column
            dataIndex={["opportunity_type", "name"]}
            title="Type d'opportunité"
          />
          <Table.Column
            dataIndex={["beginning_date"]}
            title="Date de début"
            render={(value: any) => {
              if (value) {
                return <DateField value={value} />;
              } else {
                return "-";
              }
            }}
          />
          <Table.Column
            dataIndex={["ending_date"]}
            title="Date de fin"
            render={(value: any) => {
              if (value) {
                return <DateField value={value} />;
              } else {
                return "-";
              }
            }}
          />
          <Table.Column dataIndex="target_people" title="Cible" />
          <Table.Column dataIndex="target_country" title="pays" />
          <Table.Column dataIndex="activity_area" title="Secteur D'Activité" />
          {/* <Table.Column
            dataIndex="description"
            title="Description"
            render={(value: any) => {
              if (value && value.length > 100) {
                return value.substring(0, 100) + "...";
              } else if (value) {
                return value;
              } else {
                return "-";
              }
            }}
          /> */}
          <Table.Column
            ellipsis={true}
            dataIndex="eligibility"
            title="Éligibilité"
            render={(value: any) => {
              if (value && value.length > 100) {
                return value.substring(0, 100) + "...";
              } else if (value) {
                return value;
              } else {
                return "-";
              }
            }}
          />
          <Table.Column
            ellipsis={true}
            dataIndex="processus"
            title="Processus"
            render={(value: any) => {
              if (value && value.length > 100) {
                return value.substring(0, 100) + "...";
              } else if (value) {
                return value;
              } else {
                return "-";
              }
            }}
          />
          <Table.Column
            ellipsis={true}
            dataIndex="beneficies"
            title="Bénéfices"
            render={(value: any) => {
              if (value && value.length > 100) {
                return value.substring(0, 100) + "...";
              } else if (value) {
                return value;
              } else {
                return "-";
              }
            }}
          />
          <Table.Column
            ellipsis={true}
            dataIndex="registration_link"
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
            title="Lien d'inscription"
          />
          <Table.Column
            dataIndex={["isRecurrent"]}
            title="Est Récurrent"
            render={(value: any) => {
              if (value) {
                return <BooleanField value={value} />;
              } else {
                return "-";
              }
            }}
          />
          <Table.Column dataIndex="frequency" title="Fréquence" />
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
