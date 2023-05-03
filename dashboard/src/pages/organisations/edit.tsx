import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const OrganisationEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const organisationsData = queryResult?.data?.data;

  const { selectProps: typeSelectProps } = useSelect({
    resource: "organisation_types",
    optionValue: "_id",
    optionLabel: "name",
    defaultValue: organisationsData?.type?.name,
  });

  const { selectProps: contributorSelectProps } = useSelect({
    resource: "users?role=contributor",
    optionValue: "_id",
    optionLabel: "username",
    filters: [
      {
        field: "role",
        operator: "eq",
        value: "contributor",
      },
    ],
    defaultValue: organisationsData?.contributeur?.username,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name={["type", "_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...typeSelectProps} />
        </Form.Item>
        <Form.Item
          label="Contributeur"
          name={["contributeur", "_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...contributorSelectProps} />
        </Form.Item>
        <Form.Item
          label="Propriétaire"
          name={["owner"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Select.Option value={true}>Oui</Select.Option>
            <Select.Option value={false}>Non</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Description" name={["description"]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name={["email"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Telephone"
          name={["telephone"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Site Web"
          name={["site_web"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Linkedin Url"
          name={["linkedin_url"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Adresse"
          name={["adresse"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
