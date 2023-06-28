import React, { useEffect, useState } from "react";
import {
  IResourceComponentsProps,
  file2Base64,
  useApiUrl,
} from "@refinedev/core";
import { Create, getValueFromEvent, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Upload, message } from "antd";
import { axiosInstance } from "../../authProvider";
import ReactQuill from "react-quill";
import { imageUploadHandler, reactQuillModules } from "../posts/create";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export const OrganisationCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  const [editorContent, setEditorContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string>();
  const [uploadLoading, setUploadLoading] = useState(false);
  const apiUrl = useApiUrl();

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = async (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    // return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    setUploadLoading(true);
    const base64 = await file2Base64(info.file);
    const url = await imageUploadHandler(base64);
    setImageUrl(url);
  };

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

    if (values.logo) {
      values.logo = imageUrl;
    }
    if (!values?.contributeur?._id) {
      values.contributeur = null;
    }
    if (!values?.type?._id) {
      values.type = null;
    }
    console.log(values);

    onFinish(values);
  }

  // const { selectProps: contributorSelectProps } = useSelect({
  //   resource: "users?role=contributor",
  //   optionValue: "_id",
  //   optionLabel: "username",
  //   defaultValue: "",
  // });

  const { selectProps: organisationTypeSelectProps } = useSelect({
    resource: "organisation_types",
    optionValue: "_id",
    optionLabel: "name",
    defaultValue: "",
  });

    const uploadButton = (
      <div>
        {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

  useEffect(() => {
    if (imageUrl) {
      setUploadLoading(false);
    }
  }, [imageUrl]);

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmitCapture}>
        <Form.Item
          label="Nom"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Pays" name={["country"]}>
          <Input />
        </Form.Item>
        {/* <Form.Item label="Logo"> */}
        <Form.Item
          label="Logo"
          name="logo"
          // valuePropName="fileList"
          // getValueFromEvent={getValueFromEvent}
          // noStyle
        >
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            // action={`${apiUrl}/upload/images`}
            // // Define the body of the request
            // listType="picture"
            // maxCount={1}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
          {/* </Form.Item> */}
        </Form.Item>
        <Form.Item label="Type" name={["type", "_id"]}>
          <Select {...organisationTypeSelectProps} />
        </Form.Item>
        {/* <Form.Item label="Contributeur" name={["contributeur", "_id"]}>
          <Select {...contributorSelectProps} />
        </Form.Item> */}

        <Form.Item label="Contact" name={["owner"]}>
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
        <Form.Item label="Email" name={["email"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Telephone" name={["telephone"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Site Web" name={["site_web"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Url LinkeDin" name={["linkedin_url"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Url Facebook" name={["facebook_url"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Url Twitter" name={["twitter_url"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Adresse" name={["adresse"]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
