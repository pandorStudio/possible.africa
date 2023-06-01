import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, Checkbox } from "antd";
import dayjs from "dayjs";

export const EventEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const eventsData = queryResult?.data?.data;

  const { selectProps: organisationSelectProps } = useSelect({
    resource: "organisations",
    optionLabel: "name",
    optionValue: "_id",
    defaultValue: eventsData?.organisation?.name,
  });

  const { selectProps: eventTypeSelectProps } = useSelect({
    resource: "event_types",
    optionValue: "_id",
    defaultValue: eventsData?.event_type,
    optionLabel: "name",
  });

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionValue: "_id",
    defaultValue: eventsData?.user,
    optionLabel: "username",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Organisation" name={"organisation"}>
          <Select {...organisationSelectProps} />
        </Form.Item>
        <Form.Item
          label="Titre"
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Date de début"
          name={["beginningDate"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Date de fin"
          name={["endingDate"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Type d'événement" name={"event_type"}>
          <Select {...eventTypeSelectProps} />
        </Form.Item>
        <Form.Item label="Format" name={["format"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Pays cible" name={["target_countriy"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Secteur d'activité" name={["activity_area"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name={["description"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Lien d'inscription" name={["registration_link"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Emplacement" name={["location"]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Est récurrent"
          valuePropName="checked"
          name={["is_recurrent"]}
        >
          <Checkbox>Is Recurrent</Checkbox>
        </Form.Item>
        <Form.Item label="Frequence" name={["frequence"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Contributeur" name={"user"}>
          <Select {...userSelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
