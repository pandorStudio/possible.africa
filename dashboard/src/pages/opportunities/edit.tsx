import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, Checkbox } from "antd";
import dayjs from "dayjs";

export const OpportunityEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const opportunitiesData = queryResult?.data?.data;

  const { selectProps: organisationSelectProps } = useSelect({
    resource: "organisations",
    optionValue: "_id",
    optionLabel: "name",
    defaultValue: opportunitiesData?.organisation,
  });

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionValue: "_id",
    defaultValue: opportunitiesData?.user,
    optionLabel: "username",
  });

  const { selectProps: opportunityTypeSelectProps } = useSelect({
    resource: "opportunity_types",
    optionValue: "_id",
    defaultValue: opportunitiesData?.opportunity_type,
    optionLabel: "name",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Organisation"
          name={"organisation"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...organisationSelectProps} />
        </Form.Item>
        <Form.Item label="Contributeur" name={"user"}>
          <Select {...userSelectProps} />
        </Form.Item>
        <Form.Item label="Type d'opportunité" name={"opportunity_type"}>
          <Select {...opportunityTypeSelectProps} />
        </Form.Item>
        <Form.Item label="Titre" name={["title"]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Date de début"
          name={["beginning_date"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Date de fin"
          name={["ending_date"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Acteur Cible" name={["target_people"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Pays Cible" name={["target_country"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Secteur d'activité" name={["activity_area"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name={["description"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Eligibilité" name={["eligibility"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Processus" name={["processus"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Bénéfices" name={["beneficies"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Lien d'inscription" name={["registration_link"]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Est récurrent"
          valuePropName="checked"
          name={["isRecurrent"]}
        >
          <Checkbox>Est récurent</Checkbox>
        </Form.Item>
        <Form.Item label="Fréquemce" name={["frequency"]}>
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
