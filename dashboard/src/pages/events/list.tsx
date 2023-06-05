import React, { useEffect, useRef, useState } from "react";
import { IResourceComponentsProps, BaseRecord, useApiUrl, useInvalidate } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  BooleanField,
  DeleteButton,
  CreateButton,
  ExportButton,
} from "@refinedev/antd";
import { Table, Space, Input, message } from "antd";
import { axiosInstance } from "@refinedev/simple-rest";
import papa from "papaparse";

export const EventList: React.FC<IResourceComponentsProps> = () => {
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
              registration_link: el[5],
              location: el[6],
              isRecurrent: el[7],
              frequency: el[8],
            };
            body.push({ ...ob });
            // await axios.post(apiUrl + "/organisations", el);
            setImportLoading(true);
            await axiosInstance
              .post(
                apiUrl + "/events",
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
        resource: "events",
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
          <Table.Column dataIndex="title" title="Titre" />
          <Table.Column
            dataIndex={["beginningDate"]}
            title="Date de début"
            render={(value: any) => <DateField value={value} />}
          />
          <Table.Column
            dataIndex={["endingDate"]}
            title="Date de fin"
            render={(value: any) => <DateField value={value} />}
          />
          <Table.Column
            dataIndex={["organisation", "name"]}
            title="Organisation"
          />
          <Table.Column
            dataIndex={["event_type", "name"]}
            title="Type d'évenement"
          />
          <Table.Column dataIndex="format" title="Format" />
          <Table.Column dataIndex="target_countriy" title="Pays Cible" />
          <Table.Column dataIndex="activity_area" title="Secteur d'activité" />
          <Table.Column
            dataIndex="description"
            title="Description"
            render={(values: any) =>
              values.length > 100 ? values.substring(0, 100) + "..." : values
            }
          />
          <Table.Column
            dataIndex="registration_link"
            title="Lien d'inscription"
          />
          <Table.Column dataIndex="location" title="Emplacement" />
          <Table.Column
            dataIndex={["is_recurrent"]}
            title="Est Récurrent"
            render={(value: any) => <BooleanField value={value} />}
          />
          <Table.Column dataIndex="frequence" title="Frequence" />
          <Table.Column dataIndex={["user", "username"]} title="Contributeur" />
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
