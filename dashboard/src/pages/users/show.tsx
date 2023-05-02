import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TextField, EmailField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const CustomTextField = (props: any) => {
  switch (props.type) {
    case "text":
      return props.size && props.size === "large" ? (
        <TextField
          style={{
            fontSize: "1.2rem",
          }}
          value={props.value}
        />
      ) : (
        <TextField value={props.value} />
      );

    case "email":
      return props.size && props.size === "large" ? (
        <EmailField style={{ fontSize: "1.2rem" }} value={props.value} />
      ) : (
        <EmailField value={props.value} />
      );

    default:
      return <TextField value={props.value} />;
  }
};

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={3}>Nom D'Utilisateur</Title>
      <CustomTextField type="text" size="large" value={record?.username} />
      <Title level={3}>Email</Title>
      <CustomTextField type="email" size="large" value={record?.email} />
      <Title level={3}>Prénom(s)</Title>
      <CustomTextField type="text" size="large" value={record?.firstname} />
      <Title level={3}>Nom de Famille</Title>
      <CustomTextField type="text" size="large" value={record?.lastname} />
      <Title level={3}>Description</Title>
      <CustomTextField type="text" size="large" value={record?.description} />
      <Title level={3}>Role</Title>
      <CustomTextField type="text" size="large" value={record?.role} />
      <Title level={3}>Genre</Title>
      <CustomTextField type="text" size="large" value={record?.gender} />
      <Title level={3}>Télephone</Title>
      <CustomTextField type="text" size="large" value={record?.phone} />
      <Title level={3}>Adresse</Title>
      <CustomTextField type="text" size="large" value={record?.address} />
      <Title level={3}>Lien Facebook </Title>
      <CustomTextField
        type="text"
        size="large"
        value={record?.facebook_profile}
      />
      <Title level={3}>Lien Twitter </Title>
      <CustomTextField
        type="text"
        size="large"
        value={record?.twitter_profile}
      />
      <Title level={3}>Lien Linkedin </Title>
      <CustomTextField
        type="text"
        size="large"
        value={record?.linkedin_profile}
      />
    </Show>
  );
};
