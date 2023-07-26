import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { DeleteButton, EmailField, Show, TextField } from "@refinedev/antd";
import { Space, Typography } from "antd";
import parse from "html-react-parser";
import { htmlParseOptions } from "../posts/show";
import { Admin } from "../../custom-components/AccessControl";
import Link from "antd/es/typography/Link";

const { Title } = Typography;

export const OrganisationShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

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
      <Title level={5}>Nom</Title>
      <TextField value={record?.name} />
      <Title level={5}>Pays</Title>
      <TextField value={record?.country?.translations?.fra?.common} />
      <Title level={5}>Type</Title>
      <TextField value={record?.type?.name} />
      <Title level={5}>Contributeur</Title>
      <TextField value={record?.contributeur?.complete_name} />
      <Title level={5}>Contact</Title>
      <TextField value={record?.owner} />
      <Title level={5}>Description</Title>
      <span>
        {record?.description &&
          parse(
            record?.description.replace(/\\n/g, "<br />"),
            htmlParseOptions
          )}
      </span>
      <Title level={5}>Email</Title>
      <EmailField value={record?.email} />
      <Title level={5}>Telephone</Title>
      {record?.telephone ? (
        <Link
          href={
            "https://www.google.com/search?q=" +
            record?.telephone?.indicatif +
            " " +
            record?.telephone?.number
          }
          // href="#"
        >
          {record?.telephone?.indicatif + " " + record?.telephone?.number}
        </Link>
      ) : (
        "-"
      )}
      <Title level={5}>Site Web</Title>
      {record?.site_web ? (
        <Link
          // href={"https://www.google.com/search?q=" + value}
          href={record?.site_web}
          target="_blank"
        >
          {record?.site_web}
        </Link>
      ) : (
        "-"
      )}
      <Title level={5}>Url Linkedin</Title>
      {record?.linkedin_url ? (
        <Link
          // href={"https://www.google.com/search?q=" + value}
          href={record?.linkedin_url}
          target="_blank"
        >
          {record?.linkedin_url}
        </Link>
      ) : (
        "-"
      )}
      <Title level={5}>Url Facebook</Title>
      {record?.facebook_url ? (
        <Link
          // href={"https://www.google.com/search?q=" + value}
          href={record?.facebook_url}
          target="_blank"
        >
          {record?.facebook_url}
        </Link>
      ) : (
        "-"
      )}
      <Title level={5}>Url Twitter</Title>
      {record?.twitter_url ? (
        <Link
          // href={"https://www.google.com/search?q=" + value}
          href={record?.twitter_url}
          target="_blank"
        >
          {record?.twitter_url}
        </Link>
      ) : (
        "-"
      )}
      <Title level={5}>Adresse</Title>
      {record?.adresse ? (
        <Link
          // href={"https://www.google.com/search?q=" + value}
          href={"https://www.google.com/maps/search/" + record?.adresse}
          target="_blank"
        >
          {record?.adresse}
        </Link>
      ) : (
        "-"
      )}
    </Show>
  );
};
