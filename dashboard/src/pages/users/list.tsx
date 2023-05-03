import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  EmailField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column dataIndex="username" title="N. Utilisateur" sorter />
        {/* <Table.Column dataIndex="password" title="Password" /> */}
        <Table.Column
          dataIndex={["email"]}
          title="Email"
          render={(value: any) => <EmailField value={value} />}
        />
        <Table.Column dataIndex="firstname" title="Prénom.s" />
        <Table.Column dataIndex="lastname" title="N. Famille" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          dataIndex="role"
          title="Role"
          render={(value: any) =>
            value === "admin"
              ? "Administrateur"
              : value === "user"
              ? "Utilisateur"
              : "Contributeur"
          }
        />
        <Table.Column
          dataIndex="gender"
          title="Genre"
          render={(value: any) =>
            value === "m" ? "Masculin" : value === "f" ? "Féminin" : "Autre"
          }
        />
        <Table.Column dataIndex="phone" title="Tèl." />
        <Table.Column dataIndex="address" title="Adresse" />
        <Table.Column dataIndex="facebook_profile" title="Profile Fb." />
        <Table.Column dataIndex="twitter_profile" title="Profile Tw." />
        <Table.Column dataIndex="linkedin_profile" title="Profile Li." />
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
