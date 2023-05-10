import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
// import dayjs from "dayjs";

const { Option } = Select;

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  // const usersData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Prénom.s"
          name={["username"]}
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name={["email"]}
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Firstname"
          name={["firstname"]}
          rules={[
            {
              required: true,
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Lastname"
          name={["lastname"]}
          rules={[
            {
              required: true,
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name={["description"]}
          rules={[
            {
              required: false,
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name={["role"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select defaultValue="user" style={{ width: 120 }}>
            <Option value="admin">Administrateur</Option>
            <Option value="contributor">Contributeur</Option>
            <Option value="user">Utilisateur</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Gender"
          name={["gender"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select defaultValue="f" style={{ width: 120 }}>
            <Option value="f">Féminin</Option>
            <Option value="m">Masculin</Option>
            <Option value="o">Autres</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Phone"
          name={["phone"]}
          rules={[
            {
              required: true,
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name={["address"]}
          rules={[
            {
              required: false,
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Facebook Profile"
          name={["facebook_profile"]}
          rules={[
            {
              required: false,
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Twitter Profile"
          name={["twitter_profile"]}
          rules={[
            {
              required: false,
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Linkedin Profile"
          name={["linkedin_profile"]}
          rules={[
            {
              required: false,
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
