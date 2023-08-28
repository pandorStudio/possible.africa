import React, { useEffect, useState } from "react";
import { file2Base64, IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { Option } from "antd/es/mentions";
import { imageUploadHandler, reactQuillModules } from "../posts/create";
import ReactQuill from "react-quill";

export const JobEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();

  const jobsData = queryResult?.data?.data;

  const [editorContent, setEditorContent] = useState(jobsData?.description);

  const { selectProps: organisationSelectProps } = useSelect({
    resource: "organisations",
    optionValue: "_id",
    optionLabel: "name",
    defaultValue: jobsData?.id,
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
    if (!values?.source) {
      values.source = null;
    }
    onFinish(values);
  }

  useEffect(() => {
    if (jobsData?.content) {
      setEditorContent(jobsData?.content);
    }
  }, [jobsData]);

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
        <Form.Item label="Organisation" name={["organisation", "_id"]}>
          <Select {...organisationSelectProps} />
        </Form.Item>
        <Form.Item label="Source" name={["source"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Type" name={["type"]}>
          <Select defaultValue={jobsData?.type}>
            <Option value="CDI">CDI</Option>
            <Option value="CDD">CDD</Option>
            <Option value="Stage">Stage</Option>
            <Option value="Alternance">Alternance</Option>
            <Option value="Freelance">Freelance</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Salaire" name={["salary"]}>
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
        <Form.Item label="Emplacement" name={["location"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Compétences" name={["skills"]}>
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
