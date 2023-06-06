import React, { useEffect, useRef, useState } from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useMany,
  useApiUrl,
  useInvalidate,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  ImageField,
  DeleteButton,
  TagField,
  ExportButton,
  CreateButton,
} from "@refinedev/antd";
import { Table, Space, message, Input } from "antd";
import papa from "papaparse";
import { axiosInstance } from "../../authProvider";

export const PostList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: organisationsData, isLoading: organisationsIsLoading } =
    useMany({
      resource: "organisations",
      ids: tableProps?.dataSource?.map((item) => item?.organisations) ?? [],
    });

  const [importLoading, setImportLoading] = useState(false);
  const fileImportInput = useRef(null);
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
              country: el[1],
              slug: el[2],
            };
            body.push({ ...ob });
            // await axios.post(apiUrl + "/organisations", el);
            setImportLoading(true);
            await axiosInstance
              .post(
                apiUrl + "/posts",
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
        resource: "posts",
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
        <Table {...tableProps} rowKey="_id" scroll={{ x: 1800, y: "auto" }}>
          <Table.Column dataIndex={["user", "username"]} title="Auteur" />
          <Table.Column
            width="30%"
            dataIndex="organisations"
            title="Organisations"
            render={(value: any[]) =>
              organisationsIsLoading ? (
                <>Loading ...</>
              ) : (
                <>
                  {value?.map((item, index) => (
                    <TagField
                      key={index}
                      value={
                        organisationsData?.data?.find(
                          (resourcesItems) => resourcesItems._id === item?._id
                        )?.name
                      }
                    />
                  ))}
                </>
              )
            }
          />
          <Table.Column dataIndex="title" title="Titre" />
          <Table.Column dataIndex="country" title="Pays" />
          <Table.Column dataIndex="slug" title="Slug" />
          <Table.Column
            dataIndex={["image"]}
            title="Couverture"
            render={(value: any) => (
              <ImageField style={{ maxWidth: "100px" }} value={value} />
            )}
          />
          <Table.Column dataIndex={["categorie", "name"]} title="Categorie" />
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
