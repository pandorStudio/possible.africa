import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
  Show,
  TagField,
  TextField,
  NumberField,
  DateField,
} from "@refinedev/antd";
import { Typography } from "antd";
import parse from "html-react-parser";

const { Title } = Typography;

export const JobShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Titre</Title>
      <TextField value={record?.title} />
      <Title level={5}>Organisation</Title>
      <TextField value={record?.organisation?.name} />
      <Title level={5}>Description</Title>
      <span>
        {record?.description &&
          parse(record?.description.replace(/\\n/g, "<br />"))}
      </span>
      <Title level={5}>Type</Title>
      <TextField value={record?.type} />
      <Title level={5}>Salaire</Title>
      <NumberField value={record?.salary ?? ""} />
      <Title level={5}>Date de début</Title>
      <DateField value={record?.beginning_date} />
      <Title level={5}>Date de fin</Title>
      <DateField value={record?.ending_date} />
      <Title level={5}>Emplacement</Title>
      <TextField value={record?.location} />
      <Title level={5}>Compétences</Title>
      <TextField value={record?.skills} />
    </Show>
  );
};
