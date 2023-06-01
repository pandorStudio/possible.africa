import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

export const BlogPostEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const blogPostsData = queryResult?.data?.data;

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    defaultValue: blogPostsData?.category?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Id" name={["id"]}>
          <Input readOnly disabled />
        </Form.Item>
        <Form.Item label="Title" name={["title"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Content" name="content">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item label="Category" name={["category", "id"]}>
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item label="Status" name={["status"]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Created At"
          name={["createdAt"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Edit>
  );
};
