import React, { useState } from "react";
import { file2Base64, IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Checkbox, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { Option } from "antd/es/mentions";
import { imageUploadHandler, reactQuillModules } from "../posts/create";
import ReactQuill from "react-quill";
import CustomFormDivider from "../../custom-components/FormDivider";

export const OpportunityCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  const [editorContent, setEditorContent] = useState("");
  const { selectProps: organisationsSelectProps } = useSelect({
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

  const { selectProps: countriesSelectProps } = useSelect({
    resource: "countries",
    optionValue: "_id",
    optionLabel: "translations.fra.common",
  });

  const { selectProps: opportunityTargetSelectProps } = useSelect({
    resource: "opportunity_targets",
    optionLabel: "name",
    optionValue: "_id",
  });

  const { selectProps: activityAreasSelectProps } = useSelect({
    resource: "activity_areas",
    optionValue: "_id",
    optionLabel: "name",
  });

  const { selectProps: contactsSelectProps } = useSelect({
    resource: "users",
    optionLabel: "complete_name",
    optionValue: "_id",
    filters: [
      {
        field: "role",
        operator: "eq",
        value: "contact",
      },
    ],
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
    if (!values?.organisations) {
      values.organisations = null;
    }
    if (!values?.user) {
      values.user = null;
    }
    if (!values?.targets) {
      values.targets = null;
    }
    if (!values?.target_countries) {
      values.target_countries = null;
    }
    if (!values?.activity_areas) {
      values.activity_areas = null;
    }
    if (!values?.contacts) {
      values.contacts = null;
    }
    if (!values?.opportunity_type?._id) {
      values.opportunity_type = null;
    }
    onFinish(values);
  }

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmitCapture}>
        <CustomFormDivider text="Informations générales" />
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
        <Form.Item label="Opportunity Type" name={["opportunity_type", "_id"]}>
          <Select {...opportunityTypeSelectProps} />
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
        <CustomFormDivider text="Coordonnées" />
        <Form.Item label="Lien d'inscription" name={["registration_link"]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Référents"
          name={["contacts"]}
          getValueProps={(value: any[]) => {
            return {
              value: value?.map((item) => item),
            };
          }}
          getValueFromEvent={(...args: any) => {
            const toBeReturned = args[1].map((item: any) => {
              return item.value;
            });
            return toBeReturned;
          }}
        >
          <Select
            mode="multiple"
            {...contactsSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item
          label="Organisations"
          name={["organisations"]}
          getValueProps={(value: any[]) => {
            return {
              value: value?.map((item) => item),
            };
          }}
          getValueFromEvent={(...args: any) => {
            const toBeReturned = args[1].map((item: any) => {
              return item.value;
            });
            return toBeReturned;
          }}
        >
          <Select
            mode="multiple"
            {...organisationsSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <CustomFormDivider text="Détails & Caractéristiques" />
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
        <Form.Item
          label="Acteurs Cible"
          name={["targets"]}
          getValueProps={(value: any[]) => {
            return {
              value: value?.map((item) => item),
            };
          }}
          getValueFromEvent={(...args: any) => {
            const toBeReturned = args[1].map((item: any) => {
              return item.value;
            });
            return toBeReturned;
          }}
        >
          <Select
            mode="multiple"
            {...opportunityTargetSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item
          label="Pays Cibles"
          name={["target_countries"]}
          getValueProps={(value: any[]) => {
            return {
              value: value?.map((item) => item),
            };
          }}
          getValueFromEvent={(...args: any) => {
            const toBeReturned = args[1].map((item: any) => {
              return item.value;
            });
            return toBeReturned;
          }}
        >
          {/*<SelectCountry />*/}
          <Select
            mode="multiple"
            {...countriesSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item
          label="Secteur d'activité"
          name={["activity_areas"]}
          getValueProps={(value: any[]) => {
            return {
              value: value?.map((item) => item),
            };
          }}
          getValueFromEvent={(...args: any) => {
            const toBeReturned = args[1].map((item: any) => {
              return item.value;
            });
            return toBeReturned;
          }}
        >
          <Select
            mode="multiple"
            {...activityAreasSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
