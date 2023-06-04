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

export const OpportunityList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id" scroll={{ x: 2500, y: "auto" }}>
        <Table.Column dataIndex="title" title="Titre" />
        <Table.Column dataIndex={["user", "username"]} title="Contributeur" />
        <Table.Column
          dataIndex={["opportunity_type", "name"]}
          title="Type d'opportunité"
        />
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
        <Table.Column dataIndex="target_people" title="Cible" />
        <Table.Column dataIndex="target_country" title="pays" />
        <Table.Column dataIndex="activity_area" title="Secteur D'Activité" />
        <Table.Column
          dataIndex="description"
          title="Description"
          render={(values: any) =>
            values.length > 100 ? values.substring(0, 100) + "..." : values
          }
        />
        <Table.Column
          dataIndex="eligibility"
          title="Éligibilité"
          render={(values: any) =>
            values.length > 100 ? values.substring(0, 100) + "..." : values
          }
        />
        <Table.Column
          dataIndex="processus"
          title="Processus"
          render={(values: any) =>
            values.length > 100 ? values.substring(0, 100) + "..." : values
          }
        />
        <Table.Column
          dataIndex="beneficies"
          title="Bénéfices"
          render={(values: any) =>
            values.length > 100 ? values.substring(0, 100) + "..." : values
          }
        />
        <Table.Column
          dataIndex="registration_link"
          title="Lien d'inscription"
        />
        <Table.Column
          dataIndex={["isRecurrent"]}
          title="Est Récurrent"
          render={(value: any) => <BooleanField value={value} />}
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
  );
};
