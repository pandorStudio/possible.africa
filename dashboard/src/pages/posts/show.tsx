import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TagField, TextField, ImageField } from "@refinedev/antd";
import { Typography } from "antd";
import parse from "html-react-parser";

const { Title } = Typography;

export const PostShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Auteur</Title>
      <TextField value={record?.user?.username} />
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />
      <Title level={5}>Slug</Title>
      <TextField value={record?.slug} />
      <Title level={5}>Content</Title>
      <span>
        {" "}
        {record?.content && parse(record?.content.replace(/\\n/g, "<br />"))}
      </span>
      <Title level={5}>Image</Title>
      <ImageField style={{ maxWidth: 200 }} value={record?.image} />
      <Title level={5}>Categorie</Title>
      <TextField value={record?.categorie?.name} />
      <Title level={5}>Id</Title>
      <TextField value={record?.id} />
    </Show>
  );
};
