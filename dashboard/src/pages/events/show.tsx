import React from "react";
import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import {
  Show,
  TagField,
  TextField,
  DateField,
  BooleanField,
  DeleteButton,
} from "@refinedev/antd";
import { Space, Typography } from "antd";
import parse from "html-react-parser";
import { htmlParseOptions } from "../posts/show";
import { AdminOrContributor } from "../../custom-components/AccessControl";
import Link from 'antd/es/typography/Link';

const { Title } = Typography;

export const EventShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: organisationData, isLoading: organisationIsLoading } = useOne({
    resource: "organisations",
    id: record?.organisation || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: eventTypeData, isLoading: eventTypeIsLoading } = useOne({
    resource: "event_types",
    id: record?.event_type || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: userData, isLoading: userIsLoading } = useOne({
    resource: "users",
    id: record?.user || "",
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
      <Title level={5}>Organisation</Title>
      {record?.organisation ? <>{organisationData?.data?.name || "-"}</> : "-"}
      {/* {organisationIsLoading ? (
        <>Loading...</>
      ) : (
        <>{organisationData?.data?.name}</>
      )} */}
      <Title level={5}>Titre</Title>
      <TextField value={record?.title} />
      <Title level={5}>Date de début</Title>
      <DateField value={record?.beginningDate} />
      <Title level={5}>Date de fin</Title>
      <DateField value={record?.endingDate} />
      <Title level={5}>Type d'evenement</Title>
      {eventTypeIsLoading ? <>Loading...</> : <>{eventTypeData?.data?.name}</>}
      <Title level={5}>Format</Title>
      <TextField value={record?.format} />
      <Title level={5}>Pays cible</Title>
      {record?.target_country ? (
        <Link
          href={"https://www.google.com/maps/search/" + record?.target_country}
          target="_blank"
        >
          {record?.target_country}
        </Link>
      ) : (
        "-"
      )}
      <Title level={5}>Secteur d'activité</Title>
      <TextField value={record?.activity_area} />
      <Title level={5}>Description</Title>
      <span>
        {record?.description &&
          parse(
            record?.description.replace(/\\n/g, "<br />"),
            htmlParseOptions
          )}
      </span>
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
      <Title level={5}>Est récurrent</Title>
      <BooleanField value={record?.is_recurrent} />
      <Title level={5}>Frequence</Title>
      <TextField value={record?.frequence} />
      <Title level={5}>Contributeur</Title>
      {userIsLoading ? <>Loading...</> : <>{userData?.data?.username}</>}
    </Show>
  );
};
