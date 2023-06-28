import React, { useEffect, useState } from "react";
import {
  IResourceComponentsProps,
  file2Base64,
  useApiUrl,
} from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { imageUploadHandler } from "../posts/create";

const { Option } = Select;

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, onFinish } = useForm();
  const { selectProps: roleSelectProps } = useSelect({
    resource: "user_roles",
  });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [uploadLoading, setUploadLoading] = useState(false);

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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    if (imageUrl) {
      setUploadLoading(false);
    }
  }, [imageUrl]);

  const apiUrl = useApiUrl();

  async function onSubmitCapture(values: any) {
    if (values.avatar) {
      values.avatar = imageUrl;
    } else {
      values.avatar = "";
    }
    onFinish(values);
  }

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmitCapture}>
        <Form.Item
          label="Prénom.s"
          name={["firstname"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="N. Famille"
          name={["lastname"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* Create avatar upload input */}
        <Form.Item label="Avatar" name={["avatar"]}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="N. Utilisateur" name={["username"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name={["email"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mot de passe" name={["password"]}>
          <Input.Password />
        </Form.Item>

        {/* Input for confirmPassword it must be the same as password input */}
        <Form.Item label="Confirmer le mot de passe" name={["confirmPassword"]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Description" name={["description"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Role" name={["role", "_id", "name"]}>
          {/* <Select defaultValue="user" style={{ width: 120 }}>
            <Option value="admin">Administrateur</Option>
            <Option value="contributor">Contributeur</Option>
            <Option value="user">Utilisateur</Option>
          </Select> */}
          <Select
            {...roleSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item label="Genre" name={["gender"]}>
          <Select defaultValue="f" style={{ width: 120 }}>
            <Option value="f">Féminin</Option>
            <Option value="m">Masculin</Option>
            <Option value="o">Autres</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tèl." name={["phone"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Adresse" name={["address"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Fb." name={["facebook_profile"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Tw." name={["twitter_profile"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Li." name={["linkedin_profile"]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
