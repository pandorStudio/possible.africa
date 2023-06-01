import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const OrganisationTypeEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const organisationTypesData = queryResult?.data?.data;

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
        <Form.Item label="Slug" name={["slug"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Id" name={["id"]}>
          <Input readOnly disabled />
        </Form.Item>
      </Form>
    </Edit>
  );
};
