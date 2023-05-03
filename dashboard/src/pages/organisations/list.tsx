import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  TagField,
  EmailField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const OrganisationList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex={["type", "name"]} title="Type" />
        <Table.Column
          dataIndex={["contributeur", "username"]}
          title="Contributeur"
        />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          dataIndex={["email"]}
          title="Email"
          render={(value: any) => <EmailField value={value} />}
        />
        <Table.Column dataIndex="telephone" title="Telephone" />
        <Table.Column dataIndex="site_web" title="Site Web" />
        <Table.Column dataIndex="linkedin_url" title="Linkedin Url" />
        <Table.Column dataIndex="adresse" title="Adresse" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
