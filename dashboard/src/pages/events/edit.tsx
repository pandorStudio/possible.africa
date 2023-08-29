import React, { useEffect, useState } from "react";
import { file2Base64, IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Checkbox, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { imageUploadHandler, reactQuillModules } from "../posts/create";
import ReactQuill from "react-quill";
import CustomFormDivider from "../../custom-components/FormDivider";

export const EventEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();

  const eventsData = queryResult?.data?.data;

  const [editorContent, setEditorContent] = useState(eventsData?.description);

  const { selectProps: organisationsSelectProps } = useSelect({
    resource: "organisations",
    optionLabel: "name",
    optionValue: "_id",
    defaultValue: eventsData?.organisations?._id,
  });

  const { selectProps: eventTypeSelectProps } = useSelect({
    resource: "event_types",
    optionValue: "_id",
    defaultValue: eventsData?.event_type,
    optionLabel: "name",
  });
  const { selectProps: contactsSelectProps } = useSelect({
    resource: "users",
    optionLabel: "complete_name",
    optionValue: "_id",
    defaultValue: eventsData?.contacts?._id,
    filters: [
      {
        field: "role",
        operator: "eq",
        value: "contact",
      },
    ],
  });
  const { selectProps: activityAreasSelectProps } = useSelect({
    resource: "activity_areas",
    optionValue: "_id",
    optionLabel: "name",
    defaultValue: eventsData?.activity_areas,
  });

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionValue: "_id",
    defaultValue: eventsData?.user,
    optionLabel: "complete_name",
  });

  const { selectProps: countrySelectProps } = useSelect({
    resource: "countries",
    optionValue: "_id",
    optionLabel: "translations.fra.common",
    defaultValue: eventsData?.target_countries?._id,
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
    if (!values?.user) {
      values.user = null;
    }
    if (!values?.contacts) {
      values.contacts = null;
    }
    if (!values?.activity_areas) {
      values.activity_areas = null;
    }
    if (!values?.target_countries) {
      values.target_countries = null;
    }
    if (!values?.event_type?._id) {
      values.event_type = null;
    }
    onFinish(values);
  }

  useEffect(() => {
    if (eventsData?.content) {
      setEditorContent(eventsData?.content);
    }
  }, [eventsData]);

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
        <Form.Item label="Type d'événement" name={["event_type", "_id"]}>
          <Select {...eventTypeSelectProps} />
        </Form.Item>
        <Form.Item label="Format" name={["format"]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Date de début"
          name={["beginningDate"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Date de fin"
          name={["endingDate"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Est récurrent"
          valuePropName="checked"
          name={["is_recurrent"]}
        >
          <Checkbox>Is Recurrent</Checkbox>
        </Form.Item>
        <Form.Item label="Frequence" name={["frequence"]}>
          <Input />
        </Form.Item>
        <CustomFormDivider text="Coordonnées" />
        <Form.Item label="Localisation" name={["location"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Lien d'inscription" name={["registration_link"]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Contacts"
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
        <Form.Item
          label="Organisations"
          name={["organisations"]}
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
            value={editorContent}
            onChange={setEditorContent}
            theme="snow"
            placeholder="Placez votre contenu ici..."
          />
        </Form.Item>
        <Form.Item
          label="Pays cible"
          name={["target_countries"]}
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
            {...countrySelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item
          label="Secteur d'activité"
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
