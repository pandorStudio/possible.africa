import React, { useEffect } from "react";
import {
  IResourceComponentsProps,
  useMany,
  useOne,
  useShow,
} from "@refinedev/core";
import {
  BooleanField,
  DateField,
  DeleteButton,
  Show,
  TagField,
  TextField,
} from "@refinedev/antd";
import { Space, Typography } from "antd";
import parse from "html-react-parser";
import { htmlParseOptions } from "../posts/show";
import { Admin } from "../../custom-components/AccessControl";
import Link from "antd/es/typography/Link";

const { Title } = Typography;

export const OpportunityShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: organisationsData, isLoading: organisationsIsLoading } =
    useMany({
      resource: "organisations",
      ids: record?.organisations?.map((item: any) => item?.organisations) ?? [],
    });

  const { data: contactsData, isLoading: contactsIsLoading } = useMany({
    resource: "users",
    ids: record?.contacts?.map((item: any) => item?.contacts) ?? [],
  });
  const { data: targetsData, isLoading: targetsIsLoading } = useMany({
    resource: "users",
    ids: record?.targets?.map((item: any) => item?.targets) ?? [],
  });
  const { data: targetCountriesData, isLoading: targetCountriesIsLoading } =
    useMany({
      resource: "countries",
      ids:
        record?.target_countries?.map((item: any) => item?.target_countries) ??
        [],
    });
  const { data: activityAreasData, isLoading: activityAreasIsLoading } =
    useMany({
      resource: "countries",
      ids:
        record?.covered_countries?.map(
          (item: any) => item?.covered_countries
        ) ?? [],
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
      <Title level={5}>Titre</Title>
      <TextField value={record?.title} />
      <Title level={5}>Type d'opportunité</Title>
      <TextField value={record?.opportunity_type?.name} />
      <Title level={5}>Date de début</Title>
      <DateField value={record?.beginning_date} />
      <Title level={5}>Date de fin</Title>
      <DateField value={record?.ending_date} />
      <Title level={5}>Est Récurrent</Title>
      <BooleanField value={record?.isRecurrent} />
      <Title level={5}>Fréquence</Title>
      <TextField value={record?.frequency} />
      <Title level={5}>Contributeur</Title>
      <TextField value={record?.user?.complete_name} />
      <Title level={5}>Lien d'inscription</Title>
      {record?.registration_link ? (
        <Link
          // href={"https://www.google.com/search?q=" + value}
          href={record?.registration_link}
          target="_blank"
        >
          {record?.registration_link}
        </Link>
      ) : (
        "-"
      )}
      <Title level={5}>Référents</Title>
      {contactsIsLoading ? (
        <>Loading ...</>
      ) : contactsData?.data?.length && record?.contacts?.length ? (
        <>
          {record?.contacts.map((contact: any) => (
            <TagField key={contact?._id} value={contact?.complete_name} />
          ))}
        </>
      ) : (
        "_"
      )}
      <Title level={5}>Organisations</Title>
      {organisationsIsLoading ? (
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
      <Title level={5}>Description</Title>
      <span>
        {record?.description &&
          parse(
            record?.description.replace(/\\n/g, "<br />"),
            htmlParseOptions
          )}
      </span>

      <Title level={5}>Cibles</Title>
      {targetsIsLoading ? (
        <>Loading ...</>
      ) : targetsData?.data?.length && record?.targets?.length ? (
        <>
          {record?.targets.map((target: any) => (
            <TagField key={target?._id} value={target?.name} />
          ))}
        </>
      ) : (
        "_"
      )}

      <Title level={5}>Pays Cibles</Title>
      {targetCountriesIsLoading ? (
        <>Loading ...</>
      ) : targetCountriesData?.data?.length &&
        record?.target_countries?.length ? (
        <>
          {record?.target_countries.map((country: any) => (
            <TagField
              key={country?._id}
              value={country?.translations?.fra?.common}
            />
          ))}
        </>
      ) : (
        "_"
      )}
      <Title level={5}>Secteurs d'activités</Title>
      {activityAreasIsLoading ? (
        <>Loading ...</>
      ) : activityAreasData?.data?.length && record?.activity_areas?.length ? (
        <>
          {record?.activity_areas.map((activity_area: any) => (
            <TagField key={activity_area?._id} value={activity_area?.name} />
          ))}
        </>
      ) : (
        "_"
      )}
    </Show>
  );
};
