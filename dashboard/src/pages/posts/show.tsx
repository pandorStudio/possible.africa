import React from "react";
import { IResourceComponentsProps, useMany, useShow } from "@refinedev/core";
import {
  DeleteButton,
  ImageField,
  Show,
  TagField,
  TextField,
} from "@refinedev/antd";
import { Space, Typography } from "antd";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { Admin } from "../../custom-components/AccessControl";
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

  // useEffect(() => {
  //   console.log(record);
  // }, [record]);

  const { data: organisationsData, isLoading: organisationIsLoading } = useMany(
    {
      resource: "organisations",
      ids: record?.organisations?.map((item: any) => item?.organisations) ?? [],
    }
  );

  const { data: countriesData, isLoading: countryIsLoading } = useMany({
    resource: "countries",
    ids: record?.countries?.map((item: any) => item?.countries) ?? [],
  });

  const { data: labelsData, isLoading: labelsIsLoading } = useMany({
    resource: "countries",
    ids: record?.labels?.map((item: any) => item?.labels) ?? [],
  });

  const { data: editorsData, isLoading: editorsIsLoading } = useMany({
    resource: "organisations",
    ids: record?.editors?.map((item: any) => item?.editors) ?? [],
  });

  return (
    <Show
      isLoading={isLoading}
      headerProps={{
        extra: (
          <Admin>
            <Space>
              <DeleteButton recordItemId={record?.id} />
            </Space>
          </Admin>
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
      {countryIsLoading ? (
        <>Loading ...</>
      ) : countriesData?.data?.length && record?.countries?.length ? (
        <>
          {record?.countries.map((country: any) => (
            <Link
              href={
                "https://www.google.com/maps/search/" +
                country?.translations?.fra?.common
              }
              target="_blank"
              key={country?._id}
            >
              {country?.translations?.fra?.common + " "}
            </Link>
          ))}
        </>
      ) : (
        "_"
      )}
      <Title level={5}>Etiquettes</Title>
      {labelsIsLoading ? (
        <>Loading ...</>
      ) : labelsData?.data?.length && record?.labels?.length ? (
        <>
          {record?.labels.map((label: any) => (
            <TagField key={label?._id} value={label?.name} />
          ))}
        </>
      ) : (
        "_"
      )}

      <Title level={5}>Editeurs</Title>
      {editorsIsLoading ? (
        <>Loading ...</>
      ) : editorsData?.data?.length && record?.editors?.length ? (
        <>
          {record?.editors.map((editor: any) => (
            <TagField key={editor?._id} value={editor?.name} />
          ))}
        </>
      ) : (
        "_"
      )}

      <Title level={5}>Slug</Title>
      <TextField value={record?.slug} />
      <Title level={5}>Source</Title>
      {/*<TextField value={record?.source} />*/}
      {record?.source ? (
        <Link href={record?.source}>{record?.source}</Link>
      ) : (
        "-"
      )}
      <Title level={5}>Langue</Title>
      {/*<TextField value={record?.source} />*/}
      {record?.publication_language ? (
        <Link href={record?.publication_language}>
          {record?.publication_language}
        </Link>
      ) : (
        "-"
      )}
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
