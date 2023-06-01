import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

const { Option } = Select;

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Prénom.s"
          name={["firstname"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="N. Famille"
          name={["lastname"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="N. Utilisateur" name={["username"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name={["email"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mot de passe" name={["password"]}>
          <Input.Password />
        </Form.Item>

        {/* Input for confirmPassword it must be the same as password input */}
        <Form.Item label="Confirmer le mot de passe" name={["confirmPassword"]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Description" name={["description"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Role" name={["role"]}>
          <Select defaultValue="user" style={{ width: 120 }}>
            <Option value="admin">Administrateur</Option>
            <Option value="contributor">Contributeur</Option>
            <Option value="user">Utilisateur</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Genre" name={["gender"]}>
          <Select defaultValue="f" style={{ width: 120 }}>
            <Option value="f">Féminin</Option>
            <Option value="m">Masculin</Option>
            <Option value="o">Autres</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tèl." name={["phone"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Adresse" name={["address"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Fb." name={["facebook_profile"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Tw." name={["twitter_profile"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Li." name={["linkedin_profile"]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
