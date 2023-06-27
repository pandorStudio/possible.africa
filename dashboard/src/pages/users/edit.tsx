import React, { useEffect, useState } from "react";
import { IResourceComponentsProps, file2Base64, useApiUrl } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
// import dayjs from "dayjs";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { imageUploadHandler } from "../posts/create";

const { Option } = Select;

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();

  const data = queryResult?.data?.data;

  const [loading, setLoading] = useState(false);
  const [imageUrlFromDb, setImageUrlFromDb] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>(data?.avatar);
  const usersData = queryResult?.data?.data;

    const { selectProps: roleSelectProps } = useSelect({
      resource: "user_roles",
      optionValue: "_id",
      optionLabel: "name",
      defaultValue: usersData?.role?._id,
    });
  
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
    if (data?.avatar) {
      setImageUrlFromDb(data.avatar);
    }
   }, [imageUrl, data]);
  
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
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmitCapture}>
        <Form.Item label="Nom D'Utilisateur" name={["username"]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name={["email"]}
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Prénom.s" name={["firstname"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Nom de famille" name={["lastname"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Avatar" name={["avatar"]}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrlFromDb || imageUrl ? (
              <img
                src={imageUrl || imageUrlFromDb}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="Description" name={["description"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Role" name={["role"]}>
          {/* <Select defaultValue="user" style={{ width: 120 }}>
            <Option value="admin">Administrateur</Option>
            <Option value="contributor">Contributeur</Option>
            <Option value="user">Utilisateur</Option>
          </Select> */}
          <Select {...roleSelectProps} />
        </Form.Item>
        <Form.Item label="Genre" name={["gender"]}>
          <Select defaultValue="f" style={{ width: 120 }}>
            <Option value="f">Féminin</Option>
            <Option value="m">Masculin</Option>
            <Option value="o">Autres</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Téléphone" name={["phone"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Addresse" name={["address"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Facebook" name={["facebook_profile"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Twitter" name={["twitter_profile"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Linkedin" name={["linkedin_profile"]}>
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
