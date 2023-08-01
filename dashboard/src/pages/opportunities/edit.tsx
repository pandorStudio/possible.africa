import React, { useEffect, useState } from "react";
import { file2Base64, IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Checkbox, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { imageUploadHandler, reactQuillModules } from "../posts/create";
import ReactQuill from "react-quill";
import CustomFormDivider from "../../custom-components/FormDivider";

export const OpportunityEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();

  const opportunitiesData = queryResult?.data?.data;

  const [editorContent, setEditorContent] = useState(
    opportunitiesData?.description
  );

  const { selectProps: organisationsSelectProps } = useSelect({
    resource: "organisations",
    optionValue: "_id",
    optionLabel: "name",
    defaultValue: opportunitiesData?.organisations?._id,
  });

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionValue: "_id",
    defaultValue: opportunitiesData?.user,
    optionLabel: "complete_name",
  });

  const { selectProps: opportunityTypeSelectProps } = useSelect({
    resource: "opportunity_types",
    optionValue: "_id",
    defaultValue: opportunitiesData?.opportunity_type,
    optionLabel: "name",
  });

  const { selectProps: countriesSelectProps } = useSelect({
    resource: "countries",
    optionValue: "_id",
    optionLabel: "translations.fra.common",
    defaultValue: opportunitiesData?.target_countries?._id,
  });

  const { selectProps: contactsSelectProps } = useSelect({
    resource: "users",
    optionLabel: "complete_name",
    optionValue: "_id",
    defaultValue: opportunitiesData?.contacts?._id,
    filters: [
      {
        field: "role",
        operator: "eq",
        value: "contact",
      },
    ],
  });

  const { selectProps: opportunityTargetSelectProps } = useSelect({
    resource: "opportunity_targets",
    optionLabel: "name",
    optionValue: "_id",
    defaultValue: opportunitiesData?.targets,
  });
  
  const { selectProps: activityAreasSelectProps } = useSelect({
    resource: "activity_areas",
    optionValue: "_id",
    optionLabel: "name",
    defaultValue: opportunitiesData?.activity_areas,
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
    if (!values?.organisations) {
      values.organisations = null;
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
    if (!values?.user) {
      values.user = null;
    }
    if (!values?.opportunity_type) {
      values.opportunity_type = null;
    }
    if (!values?.contacts) {
      values.contacts = null;
    }
    onFinish(values);
  }

  useEffect(() => {
    if (opportunitiesData?.content) {
      setEditorContent(opportunitiesData?.content);
    }
  }, [opportunitiesData]);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmitCapture}>
        <CustomFormDivider text="Informations générales" />
        {/* Titre */}
        <Form.Item label="Titre" name={["title"]}>
          <Input />
        </Form.Item>
        {/* Type d'opportunités */}
        <Form.Item
          label="Type d'opportunité"
          name={["opportunity_type", "_id"]}
        >
          <Select {...opportunityTypeSelectProps} />
        </Form.Item>
        {/* Date de début */}
        <Form.Item
          label="Date de début"
          name={["beginning_date"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        {/* Date de fin */}
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
          label="Est récurrent"
          valuePropName="checked"
          name={["isRecurrent"]}
        >
          <Checkbox>Est récurent</Checkbox>
        </Form.Item>
        <Form.Item label="Fréquemce" name={["frequency"]}>
          <Input />
        </Form.Item>
        <CustomFormDivider text="Coordonnées" />
        <Form.Item label="Lien d'inscription" name={["registration_link"]}>
          <Input />
        </Form.Item>
        {/* Référents */}
        <Form.Item
          label="Référents"
          name={["contacts"]}
          getValueProps={(value: any[]) => {
            return {
              value: value?.map((item) => {
                return item._id;
              }),
            };
          }}
          getValueFromEvent={(...args: any) => {
            const toBeReteurned = args[1].map((item: any) => {
              return { _id: item.value, name: item.label };
            });
            return toBeReteurned;
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
        {/* Organisations */}
        <Form.Item
          label="Organisations"
          name={["organisations"]}
          getValueProps={(value: any[]) => {
            // console.log(value);
            return {
              value: value?.map((item) => {
                return item._id;
              }),
            };
          }}
          getValueFromEvent={(...args: any) => {
            const toBeReteurned = args[1].map((item: any) => {
              // console.log(...args);
              return { _id: item.value, name: item.label };
            });
            return toBeReteurned;
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
        {/* Description */}
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
        {/* Acteurs cible */}
        <Form.Item
          label="Acteurs Cible"
          name={["targets"]}
          getValueProps={(value: any[]) => {
            return {
              value: value?.map((item) => {
                return item._id;
              }),
            };
          }}
          getValueFromEvent={(...args: any) => {
            const toBeReteurned = args[1].map((item: any) => {
              return { _id: item.value, name: item.label };
            });
            return toBeReteurned;
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
        {/* Secteurs d'activités */}
        <Form.Item
          label="Secteurs d'activité"
          name={["activity_areas"]}
          getValueProps={(value: any[]) => {
            // console.log(value);
            return {
              value: value?.map((item) => {
                return item._id;
              }),
            };
          }}
          getValueFromEvent={(...args: any) => {
            const toBeReteurned = args[1].map((item: any) => {
              // console.log(...args);
              return { _id: item.value, name: item.label };
            });
            return toBeReteurned;
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
    </Edit>
  );
};
