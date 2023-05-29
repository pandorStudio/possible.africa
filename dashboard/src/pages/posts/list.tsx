import React from "react";
import {IResourceComponentsProps, BaseRecord, useMany} from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    ImageField,
    DeleteButton, TagField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const PostList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const {data: organisationsData, isLoading: organisationsIsLoading} = useMany({
      resource: "organisations",
      ids: tableProps?.dataSource?.map((item) => item?.organisations) ?? [],
  });
    
    

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column dataIndex={["user", "username"]} title="Auteur" />
          <Table.Column dataIndex="organisations" title="Organisations" render={(value: any[]) =>
              organisationsIsLoading ? (
                  <>Loading ...</>
              ) : (
                  <>
                      {value?.map((item, index) => (
                          <TagField key={index} value={
                              organisationsData?.data?.find(
                                  (resourcesItems) => resourcesItems._id === item?._id
                              )?.name
                          }
                          />
                      ))}
                  </>
              )
          } />
        <Table.Column dataIndex="title" title="Titre" />
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
  );
};
