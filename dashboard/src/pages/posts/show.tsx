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

  // const { data: organisationsData, isLoading: organisationIsLoading } = useMany(
  //   {
  //     resource: "organisations",
  //     ids: record?.organisations?.map((item: any) => item?.organisations) ?? [],
  //   }
  // );

  // const { data: countriesData, isLoading: countryIsLoading } = useMany({
  //   resource: "countries",
  //   ids: record?.countries?.map((item: any) => item?.countries) ?? [],
  // });

  // const { data: labelsData, isLoading: labelsIsLoading } = useMany({
  //   resource: "countries",
  //   ids: record?.labels?.map((item: any) => item?.labels) ?? [],
  // });

  // const { data: editorsData, isLoading: editorsIsLoading } = useMany({
  //   resource: "organisations",
  //   ids: record?.editors?.map((item: any) => item?.editors) ?? [],
  // });

  // const { data: authorsData, isLoading: authorsIsLoading } = useMany({
  //   resource: "users",
  //   ids: record?.authors?.map((item: any) => item?.authors) ?? [],
  // });

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
      {/* <Title level={5}>Contributeur</Title>
      <TextField value={record?.user?.complete_name} /> */}
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />
      <Title level={5}>Média</Title>
      <TextField value={record?.airMedia} />
      {/* <Title level={5}>Pays</Title>
      {countryIsLoading ? (
        <>Loading ...</>
      ) : countriesData?.data?.length && record?.countries?.length ? (
        <>
          {record?.countries?.map((country: any) => (
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
      )} */}
      <Title level={5}>Etiquettes</Title>
      <TagField value={record?.airTags} />

      {/* <Title level={5}>Editeurs</Title>
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
      )} */}

      {/* <Title level={5}>Auteurs</Title>
      {authorsIsLoading ? (
        <>Loading ...</>
      ) : authorsData?.data?.length && record?.authors?.length ? (
        <>
          {record?.authors?.map((author: any) => (
            <TagField key={author?._id} value={author?.complete_name} />
          ))}
        </>
      ) : (
        "_"
      )} */}

      {/* <Title level={5}>Slug</Title>
      <TextField value={record?.slug} /> */}
      <Title level={5}>Source</Title>
      {/*<TextField value={record?.source} />*/}
      {record?.airLink ? (
        <Link href={record?.airLink}>{record?.airLink}</Link>
      ) : (
        "-"
      )}
      <Title level={5}>Langue</Title>
      {/*<TextField value={record?.source} />*/}
      <TextField value={record?.airLanguage === "FR" ? "Français" : "Anglais"} />
      {/* <Title level={5}>Content</Title>
      <span>
        {record?.content &&
          parse(record?.content.replace(/\\n/g, "<br />"), htmlParseOptions)}
      </span> */}
      {/* <Title level={5}>Image</Title>
      <ImageField style={{ maxWidth: 200 }} value={record?.image} /> */}
      {/* <Title level={5}>Categorie</Title>
      <TextField value={record?.categorie?.name} /> */}
    </Show>
  );
};
