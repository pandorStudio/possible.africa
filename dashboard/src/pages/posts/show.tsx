import React from "react";
import {
  IResourceComponentsProps,
  useMany,
  useOne,
  useShow,
} from "@refinedev/core";
import {
  DeleteButton,
  ImageField,
  Show,
  TagField,
  TextField,
} from "@refinedev/antd";
import { Space, Typography } from "antd";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { AdminOrContributor } from "../../custom-components/AccessControl";
import Link from "antd/es/typography/Link";

export const htmlParseOptions: HTMLReactParserOptions = {
  // @ts-ignore
  replace: (domNode) => {
    // @ts-ignore
    if (domNode.data && domNode.data.includes("iframe")) {
      // @ts-ignore
      // console.log(domNode.data);
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
      ids: record?.organisations?.map((item: any) => item?.organisations) ?? [],
    }
  );

  const { data: countryData, isLoading: countryIsLoading } = useOne({
    resource: "countries",
    id: record?.country || "",
    queryOptions: {
      enabled: !!record,
    },
  });

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
      ) : organisationsData?.data?.length && record?.organisations?.length ? (
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
      {countryData?.data ? (
        <Link
          href={
            "https://www.google.com/maps/search/" +
            countryData?.data?.name?.common
          }
          target="_blank"
        >
          {countryData?.data?.name?.common}
        </Link>
      ) : (
        "-"
      )}
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
    </Show>
  );
};
