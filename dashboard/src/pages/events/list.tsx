import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  BooleanField,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const EventList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
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
  );
};
