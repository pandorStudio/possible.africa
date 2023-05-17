import React from "react";
import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import {
  Show,
  TagField,
  TextField,
  DateField,
  BooleanField,
} from "@refinedev/antd";
import { Typography } from "antd";

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
    <Show isLoading={isLoading}>
      <Title level={5}>Organisation</Title>
      {organisationIsLoading ? (
        <>Loading...</>
      ) : (
        <>{organisationData?.data?.name}</>
      )}
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
      <TextField value={record?.target_countriy} />
      <Title level={5}>Secteur d'activité</Title>
      <TextField value={record?.activity_area} />
      <Title level={5}>Description</Title>
      <TextField value={record?.description} />
      <Title level={5}>Lien d'incsription</Title>
      <TextField value={record?.registration_link} />
      <Title level={5}>Emplacement</Title>
      <TextField value={record?.location} />
      <Title level={5}>Est récurrent</Title>
      <BooleanField value={record?.is_recurrent} />
      <Title level={5}>Frequence</Title>
      <TextField value={record?.frequence} />
      <Title level={5}>Contributeur</Title>
      {userIsLoading ? <>Loading...</> : <>{userData?.data?.username}</>}
    </Show>
  );
};
