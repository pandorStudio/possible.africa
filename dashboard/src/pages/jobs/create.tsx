import React, { useState } from "react";
import { file2Base64, IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import Select from "antd/lib/select";
import { Option } from "antd/es/mentions";
import { imageUploadHandler, reactQuillModules } from "../posts/create";
import ReactQuill from "react-quill";

export const JobCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  const [editorContent, setEditorContent] = useState("");

  const { selectProps: organisationSelectProps } = useSelect({
    resource: "organisations",
    optionValue: "_id",
    optionLabel: "name",
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
    if (!values?.source) {
      values.source = null;
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
        <Form.Item label="Organisation" name={["organisation", "_id"]}>
          <Select
            {...organisationSelectProps}
            defaultValue={{ value: "", label: "Sélectionner" }}
          >
            <option value="">Selectionner</option>
          </Select>
        </Form.Item>
        <Form.Item label="Source" name={["source"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Type" name={["type"]}>
          <Select defaultValue="">
            <Option value="">Sélectionner</Option>
            <Option value="CDI">CDI</Option>
            <Option value="CDD">CDD</Option>
            <Option value="Stage">Stage</Option>
            <Option value="Alternance">Alternance</Option>
            <Option value="Freelance">Freelance</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Salaire" name={["salary"]}>
          <Input type="number" />
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
        <Form.Item label="Emplacement" name={["location"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Compétences" name={["skills"]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
