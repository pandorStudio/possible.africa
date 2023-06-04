import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import { useTable, List, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Table, Space } from "antd";

export const PostCategoryList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Nom" />
        <Table.Column dataIndex="slug" title="Slug" />
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
  );
};
