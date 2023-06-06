import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  EmailField,
  ImageField,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import Link from "antd/es/typography/Link";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="_id" scroll={{ x: 2500, y: "auto" }}>
        <Table.Column dataIndex="username" title="N. Utilisateur" />

        <Table.Column
          dataIndex="avatar"
          title="Photo de profil"
          render={(value: any) => {
            if (value) {
              return <ImageField value={value} />;
            } else {
              return "-";
            }
          }}
        />
        <Table.Column
          dataIndex={["email"]}
          title="Email"
          render={(value: any) => {
            if (value) {
              return <EmailField value={value} />;
            } else {
              return "-";
            }
          }}
        />
        <Table.Column dataIndex="firstname" title="Prénom.s" />
        <Table.Column dataIndex="lastname" title="N. Famille" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          dataIndex="role"
          title="Role"
          render={(value: any) => {
            if (value) {
              value === "admin"
                ? "Administrateur"
                : value === "user"
                ? "Utilisateur"
                : "Contributeur";
            } else {
              return "-";
            }
          }}
        />
        <Table.Column
          dataIndex="gender"
          title="Genre"
          render={(value: any) => {
            if (value) {
              value === "m" ? "Masculin" : value === "f" ? "Féminin" : "Autre";
            } else {
              return "-";
            }
          }}
        />
        <Table.Column dataIndex="phone" title="Tèl." />

        <Table.Column
          dataIndex="adresse"
          title="Adresse"
          render={(value: any) => {
            if (value) {
              return (
                <Link
                  href={"https://www.google.com/search?q=" + value}
                  target="_blank"
                >
                  {value}
                </Link>
              );
            } else {
              return "-";
            }
          }}
        />
        <Table.Column
          dataIndex="facebook_profile"
          title="Profile Fb."
          render={(value: any) => {
            if (value) {
              return (
                <Link href={value} target="_blank">
                  {value}
                </Link>
              );
            } else {
              return "-";
            }
          }}
        />
        <Table.Column
          dataIndex="twitter_profile"
          title="Profile Tw."
          render={(value: any) => {
            if (value) {
              return (
                <Link href={value} target="_blank">
                  {value}
                </Link>
              );
            } else {
              return "-";
            }
          }}
        />
        <Table.Column
          dataIndex="linkedin_profile"
          title="Profile Li."
          render={(value: any) => {
            if (value) {
              return (
                <Link href={value} target="_blank">
                  {value}
                </Link>
              );
            } else {
              return "-";
            }
          }}
        />
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
