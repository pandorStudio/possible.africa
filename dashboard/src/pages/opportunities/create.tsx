import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Checkbox, Select } from "antd";
import dayjs from "dayjs";
import { Option } from "antd/es/mentions";

export const OpportunityCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const { selectProps: organisationSelectProps } = useSelect({
    resource: "organisations",
    optionValue: "_id",
    optionLabel: "name",
  });

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionValue: "_id",
    optionLabel: "username",
  });

  const { selectProps: opportunityTypeSelectProps } = useSelect({
    resource: "opportunity_types",
    optionValue: "_id",
    optionLabel: "name",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
          name={["beginning_date"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Date de fin"
          name={["ending_date"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Acteurs Cible"
          name={["target_people"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select defaultValue="">
            <Option value="">Selectionner</Option>
            <Option value="project_holder">Porteur de projet</Option>
            <Option value="startup">Starup</Option>
            <Option value="scaleup">Scaleup</Option>
            <Option value="pme-eti">PME - ETI</Option>
            <Option value="support_structure">Structure de support</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Pays Cible"
          name={["target_country"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Secteur d'activité"
          name={["activity_area"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select defaultValue="">
            <Option value="">Selectionner</Option>
            <Option value="agriculture">Agriculture</Option>
            <Option value="industry">Industry</Option>
            <Option value="services">Services</Option>
            <Option value="commerce">Commerce</Option>
            <Option value="construction">Construction</Option>
            <Option value="transport">Transport</Option>
            <Option value="health">Santé</Option>
            <Option value="education">Éducation</Option>
            <Option value="administration">Administration</Option>
            <Option value="other">Autres</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Description"
          name={["description"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Eligibilité"
          name={["eligibility"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Processus"
          name={["processus"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Bénefices"
          name={["beneficies"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Lien d'inscription"
          name={["registration_link"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Est récurent"
          valuePropName="checked"
          name={["isRecurrent"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox>Is Recurrent</Checkbox>
        </Form.Item>
        <Form.Item
          label="Fréquence"
          name={["frequency"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="contributeur"
          name={["user", "_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...userSelectProps} />
        </Form.Item>
        <Form.Item
          label="Organisation"
          name={["organisation", "_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...organisationSelectProps} />
        </Form.Item>
        <Form.Item
          label="Opportunity Type"
          name={["opportunity_type", "_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...opportunityTypeSelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
