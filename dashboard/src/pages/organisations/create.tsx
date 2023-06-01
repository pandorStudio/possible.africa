import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const OrganisationCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

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
  });

  const { selectProps: organisationTypeSelectProps } = useSelect({
    resource: "organisation_types",
    optionValue: "_id",
    optionLabel: "name",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Nom"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Type" name={["type", "_id"]}>
          <Select {...organisationTypeSelectProps} />
        </Form.Item>
        <Form.Item label="Contributeur" name={["contributeur", "_id"]}>
          <Select {...contributorSelectProps} />
        </Form.Item>

        <Form.Item label="Contact" name={["owner"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name={["description"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name={["email"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Telephone" name={["telephone"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Site Web" name={["site_web"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Url LinkeDin" name={["linkedin_url"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Url Facebook" name={["facebook_url"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Url Twitter" name={["twitter_url"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Adresse" name={["adresse"]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
