import React from "react";
import { IResourceComponentsProps, useMany, useShow } from "@refinedev/core";
import { Show, TagField, TextField, ImageField, DeleteButton } from "@refinedev/antd";
import { Space, Typography } from "antd";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { AdminOrContributor } from "../../custom-components/AccessControl";

export const htmlParseOptions: HTMLReactParserOptions = {
  // @ts-ignore
  replace: (domNode) => {
    // @ts-ignore
    if (domNode.data && domNode.data.includes("iframe")) {
      // @ts-ignore
      console.log(domNode.data);
      // create a new iframe element with the string
      // @ts-ignore
      return parse(domNode.data);
    }
  },
};
const { Title } = Typography;

export const PostShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: organisationsData, isLoading: organisationIsLoading } = useMany(
    {
      resource: "organisations",
      ids: record?.organisations.map((item: any) => item?.organisations) ?? [],
    }
  );

  return (
    <Show
      isLoading={isLoading}
      headerProps={{
        extra: (
          <AdminOrContributor>
            <Space>
              <DeleteButton recordItemId={record?.id} />
            </Space>
          </AdminOrContributor>
        ),
      }}
    >
      <Title level={5}>Auteur</Title>
      <TextField value={record?.user?.username} />
      <Title level={5}>Organisations</Title>
      {organisationIsLoading ? (
        <>Loading ...</>
      ) : organisationsData?.data?.length ? (
        <>
          {record?.organisations.map((organisation: any) => (
            <TagField key={organisation?._id} value={organisation?.name} />
          ))}
        </>
      ) : (
        "_"
      )}
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />
      <Title level={5}>Country</Title>
      <TextField value={record?.country} />
      <Title level={5}>Slug</Title>
      <TextField value={record?.slug} />
      <Title level={5}>Content</Title>
      <span>
        {record?.content &&
          parse(record?.content.replace(/\\n/g, "<br />"), htmlParseOptions)}
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
