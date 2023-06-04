import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const JobList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
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
  );
};
