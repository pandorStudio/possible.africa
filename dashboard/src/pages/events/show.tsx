import React, { useEffect } from "react";
import { IResourceComponentsProps, useMany, useShow } from "@refinedev/core";
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

export const EventShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: countriesData, isLoading: countryIsLoading } = useMany({
    resource: "countries",
    ids:
      record?.target_countries?.map((item: any) => item?.target_countries) ??
      [],
  });

  const { data: organisationsData, isLoading: organisationIsLoading } = useMany({
    resource: "organisations",
    ids: record?.organisations?.map((item: any) => item?.organisations) ?? [],
  });

  const { data: contactsData, isLoading: contactsIsLoading } = useMany({
    resource: "users",
    ids: record?.contacts?.map((item: any) => item?.contacts) ?? [],
  });
  const { data: activityAreasData, isLoading: activityAreasIsLoading } =
    useMany({
      resource: "activity_areas",
      ids:
        record?.activity_areas?.map((item: any) => item?.activity_areas) ?? [],
    });

  useEffect(() => {
    // console.log(record);
  }, [record]);

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
      <Title level={5}>Type d'evenement</Title>
      <TextField value={record?.event_type?.name} />
      <Title level={5}>Format</Title>
      <TextField value={record?.format} />
      <Title level={5}>Date de début</Title>
      <DateField value={record?.beginningDate} />
      <Title level={5}>Date de fin</Title>
      <DateField value={record?.endingDate} />
      <Title level={5}>Est récurrent</Title>
      <BooleanField value={record?.is_recurrent} />
      <Title level={5}>Frequence</Title>
      <TextField value={record?.frequence} />
      <Title level={5}>Contributeur</Title>
      <TextField value={record?.user?.complete_name} />
      <Title level={5}>Emplacement</Title>
      {record?.location ? (
        <Link
          href={"https://www.google.com/maps/search/" + record?.location}
          target="_blank"
        >
          {record?.location}
        </Link>
      ) : (
        "-"
      )}
      <Title level={5}>Lien d'incsription</Title>
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
      <Title level={5}>Contacts</Title>
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
      <Title level={5}>Description</Title>
      <span
      // style={{
      //   display: "block",
      //   boxShadow: "0 0 5px 3Opx rgba(0,0,0,1)",
      //   borderLeft: "3px solid rgba(0,0,0,0.2)",
      //   borderRadius: "10px",
      //   padding: "10px",
      // }}
      >
        {record?.description &&
          parse(
            record?.description.replace(/\\n/g, "<br />"),
            htmlParseOptions
          )}
      </span>
      <Title level={5}>Pays cibles</Title>
      {countryIsLoading ? (
        <>Loading ...</>
      ) : countriesData?.data?.length && record?.target_countries?.length ? (
        <>
          {record?.target_countries?.map((country: any) => (
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
      <Title level={5}>Secteur d'activité</Title>
      {/*<TextField value={record?.activity_area} />*/}
      {activityAreasIsLoading ? (
        <>Loading ...</>
      ) : activityAreasData?.data?.length && record?.activity_areas?.length ? (
        <>
          {record?.activity_areas?.map((activityArea: any, index) => (
            <TagField key={activityArea?._id} value={activityArea?.name} />
          ))}
        </>
      ) : (
        "_"
      )}
    </Show>
  );
};
