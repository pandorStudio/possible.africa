import React, { useState } from "react";
import { file2Base64, IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Checkbox, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { imageUploadHandler, reactQuillModules } from "../posts/create";
import ReactQuill from "react-quill";

export const OpportunityEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();

  const opportunitiesData = queryResult?.data?.data;

  const [editorContent, setEditorContent] = useState(
    opportunitiesData?.description
  );

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

  const { selectProps: countrySelectProps } = useSelect({
    resource: "countries",
    optionValue: "_id",
    optionLabel: "translations.fra.common",
    defaultValue: opportunitiesData?.target_country?._id,
  });

  async function onSubmitCapture(values: any) {
    let imgTags = editorContent?.match(/<img[^>]+src="([^">]+)"/g);
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
      let description = editorContent;
      const result = imgs.map(async (img) => {
        img.url = await imageUploadHandler(img.base64);
        // console.log(img.url);
        description = description.replace(`${img.base64}`, `${img.url}`);
        return description;
      });
      values.description = await Promise.all(result).then(
        (values: string[]) => {
          //return the last element of values array
          description = values[values.length - 1];
          return description;
        }
      );
    }

    if (values.image && values.image.length) {
      const base64 = await file2Base64(values.image[0]);
      const url = await imageUploadHandler(base64);
      values.image = url;
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
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmitCapture}>
        <Form.Item label="Organisation" name={["organisation", "_id"]}>
          <Select {...organisationSelectProps} />
        </Form.Item>
        <Form.Item label="Contributeur" name={["user", "_id"]}>
          <Select {...userSelectProps} />
        </Form.Item>
        <Form.Item
          label="Type d'opportunité"
          name={["opportunity_type", "_id"]}
        >
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
          <Select
            {...countrySelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item label="Secteur d'activité" name={["activity_area"]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name={["description"]}
          className="advancedEditor"
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
            onChange={setEditorContent}
            value={editorContent}
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
