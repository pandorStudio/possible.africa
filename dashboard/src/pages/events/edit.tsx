import React, { useState } from "react";
import { IResourceComponentsProps, file2Base64 } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, Checkbox } from "antd";
import dayjs from "dayjs";
import { imageUploadHandler, reactQuillModules } from "../posts/create";
import ReactQuill from "react-quill";

export const EventEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();

  const eventsData = queryResult?.data?.data;

    const [editorContent, setEditorContent] = useState(eventsData?.description);

  const { selectProps: organisationSelectProps } = useSelect({
    resource: "organisations",
    optionLabel: "name",
    optionValue: "_id",
    defaultValue: eventsData?.organisation?.name,
  });

  const { selectProps: eventTypeSelectProps } = useSelect({
    resource: "event_types",
    optionValue: "_id",
    defaultValue: eventsData?.event_type,
    optionLabel: "name",
  });

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionValue: "_id",
    defaultValue: eventsData?.user,
    optionLabel: "username",
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
    if (!values?.organisation?._id) {
      values.organisation = null;
    }
    if (!values?.user?._id) {
      values.user = null;
    }
    if (!values?.event_type?._id) {
      values.event_type = null;
    }
    onFinish(values);
  }

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmitCapture}>
        <Form.Item label="Organisation" name={"organisation"}>
          <Select {...organisationSelectProps} />
        </Form.Item>
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
        <Form.Item label="Type d'événement" name={"event_type"}>
          <Select {...eventTypeSelectProps} />
        </Form.Item>
        <Form.Item label="Format" name={["format"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Pays cible" name={["target_countriy"]}>
          <Input />
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
            value={editorContent}
            onChange={setEditorContent}
            theme="snow"
            placeholder="Placez votre contenu ici..."
          />
        </Form.Item>
        <Form.Item label="Lien d'inscription" name={["registration_link"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Emplacement" name={["location"]}>
          <Input />
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
        <Form.Item label="Contributeur" name={"user"}>
          <Select {...userSelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
