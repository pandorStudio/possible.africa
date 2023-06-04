import React, { useEffect, useRef, useState } from "react";
import { IResourceComponentsProps, BaseRecord, useApiUrl, useInvalidate } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  DeleteButton,
  ExportButton,
  CreateButton,
} from "@refinedev/antd";
import { Table, Space, Input, message } from "antd";
import papa from "papaparse";
import { axiosInstance } from "../../authProvider";
export const JobList: React.FC<IResourceComponentsProps> = () => {
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
              description: el[1],
              type: el[2],
              salary: el[3],
              beginning_date: el[4],
              ending_date: el[5],
              location: el[6],
              skills: el[7],
            };
            body.push({ ...ob });
            // await axios.post(apiUrl + "/organisations", el);
            setImportLoading(true);
            await axiosInstance
              .post(
                apiUrl + "/jobs",
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
        resource: "jobs",
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
      <Table
        {...tableProps}
        style={{
          width: "1800px !important",
          overflowX: "scroll",
        }}
        scroll={{ x: 1800, y: "auto" }}
        rowKey="id"
      >
        <Table.Column
          dataIndex={["organisation", "name"]}
          title="Organisation"
        />
        <Table.Column dataIndex="title" title="Titre" />
        <Table.Column
          dataIndex="description"
          title="Description"
          render={(value) => {
            return value.length > 100 ? value.slice(0, 100) + "..." : value;
          }}
        />
        <Table.Column dataIndex="type" title="Type" />
        <Table.Column dataIndex="salary" title="Salaire" />
        <Table.Column
          dataIndex={["beginning_date"]}
          title="Date de début"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["ending_date"]}
          title="Date de fin"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column dataIndex="location" title="Emplacement" />
        <Table.Column dataIndex="skills" title="Compétences" />
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
