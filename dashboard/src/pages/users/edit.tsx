import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
// import dayjs from "dayjs";

const { Option } = Select;

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const usersData = queryResult?.data?.data;

    const { selectProps: roleSelectProps } = useSelect({
      resource: "user_roles",
      optionValue: "_id",
      optionLabel: "name",
      defaultValue: usersData?.role?._id,
    });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Nom D'Utilisateur" name={["username"]}>
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
        <Form.Item label="Prénom.s" name={["firstname"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Nom de famille" name={["lastname"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name={["description"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Role" name={["role"]}>
          {/* <Select defaultValue="user" style={{ width: 120 }}>
            <Option value="admin">Administrateur</Option>
            <Option value="contributor">Contributeur</Option>
            <Option value="user">Utilisateur</Option>
          </Select> */}
          <Select {...roleSelectProps} />
        </Form.Item>
        <Form.Item label="Genre" name={["gender"]}>
          <Select defaultValue="f" style={{ width: 120 }}>
            <Option value="f">Féminin</Option>
            <Option value="m">Masculin</Option>
            <Option value="o">Autres</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Téléphone" name={["phone"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Addresse" name={["address"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Facebook" name={["facebook_profile"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Twitter" name={["twitter_profile"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Linkedin" name={["linkedin_profile"]}>
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
