import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TextField, EmailField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;



export const UserRoleShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={3}>Nom</Title>
      <TextField value={record?.name} />
      <Title level={3}>Slug</Title>
      <TextField value={record?.slug} />
    </Show>
  );
};
