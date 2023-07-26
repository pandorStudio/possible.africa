import React, { useState } from "react";
import { file2Base64, IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Checkbox, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { Option } from "antd/es/mentions";
import { imageUploadHandler, reactQuillModules } from "../posts/create";
import ReactQuill from "react-quill";

export const OpportunityCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  const [editorContent, setEditorContent] = useState("");
  const { selectProps: organisationSelectProps } = useSelect({
    resource: "organisations",
    optionValue: "_id",
    optionLabel: "name",
  });

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionValue: "_id",
    optionLabel: "complete_name",
  });

  const { selectProps: opportunityTypeSelectProps } = useSelect({
    resource: "opportunity_types",
    optionValue: "_id",
    optionLabel: "name",
  });

  const { selectProps: countrySelectProps } = useSelect({
    resource: "countries",
    optionValue: "_id",
    optionLabel: "translations.fra.common",
  });

  async function onSubmitCapture(values: any) {
    let imgTags = editorContent.match(/<img[^>]+src="([^">]+)"/g);
    if (imgTags && imgTags.length > 0) {
      let imgs = imgTags.map((imgTag) => {
        const img = {
          base64: "",
          url: "",
        };
        img.base64 = imgTag
          .match(/src="([^">]+)"/g)[0]
          .replace('src="', "")
          .replace('"', "");

        return img;
      });
      let content = editorContent;
      const result = imgs.map(async (img) => {
        img.url = await imageUploadHandler(img.base64);
        // console.log(img.url);
        content = content.replace(`${img.base64}`, `${img.url}`);
        return content;
      });

      values.content = await Promise.all(result).then((values: string[]) => {
        //return the last element of values array
        content = values[values.length - 1];
        return content;
      });
    }

    if (values.logo && values.logo.length) {
      const base64 = await file2Base64(values.logo[0]);
      const url = await imageUploadHandler(base64);
      values.logo = url;
    }
    if (!values?.organisation) {
      values.organisation = null;
    }
    if (!values?.user) {
      values.user = null;
    }
    if (!values?.opportunity_type) {
      values.opportunity_type = null;
    }
    onFinish(values);
  }

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmitCapture}>
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
        <Form.Item label="Acteurs Cible" name={["target_people"]}>
          <Select defaultValue="">
            <Option value="">Selectionner</Option>
            <Option value="project_holder">Porteur de projet</Option>
            <Option value="startup">Starup</Option>
            <Option value="scaleup">Scaleup</Option>
            <Option value="pme-eti">PME - ETI</Option>
            <Option value="support_structure">Structure de support</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Pays Cible" name={["target_country"]}>
          {/*<SelectCountry />*/}
          <Select
            {...countrySelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item label="Secteur d'activité" name={["activity_area"]}>
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
          style={{
            height: "600px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <ReactQuill
            style={{ height: "500px", width: "100%" }}
            modules={reactQuillModules}
            value={editorContent}
            onChange={setEditorContent}
            theme="snow"
            placeholder="Placez votre contenu ici..."
          />
        </Form.Item>
        <Form.Item label="Eligibilité" name={["eligibility"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Processus" name={["processus"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Bénefices" name={["beneficies"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Lien d'inscription" name={["registration_link"]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Est récurent"
          valuePropName="checked"
          name={["isRecurrent"]}
        >
          <Checkbox>Is Recurrent</Checkbox>
        </Form.Item>
        <Form.Item label="Fréquence" name={["frequency"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Contributeur" name={["user", "_id"]}>
          <Select {...userSelectProps} />
        </Form.Item>
        <Form.Item label="Organisation" name={["organisation", "_id"]}>
          <Select {...organisationSelectProps} />
        </Form.Item>
        <Form.Item label="Opportunity Type" name={["opportunity_type", "_id"]}>
          <Select {...opportunityTypeSelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
