import React, { useEffect, useState } from "react";
import {
  file2Base64,
  IResourceComponentsProps,
  useApiUrl,
} from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, message, Select, Upload } from "antd";
// import BasicEditor from "../../components/Editors/basic";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../components/Editors/styles.css";
import { axiosInstance } from "../../authProvider";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { UploadProps } from "antd/lib/upload";

const ENV = import.meta.env.VITE_NODE_ENV;
const API_URL =
  ENV === "developement"
    ? import.meta.env.VITE_BACKEND_DEV
    : import.meta.env.VITE_BACKEND_PROD;

export async function imageUploadHandler(image: any) {
  // build form data
  const bf = await fetch(image);
  const blob = await bf.blob();
  const file = new File([blob], "image." + blob.type.split("/")[1], {
    type: blob.type,
  });
  const data = new FormData();
  data.append("image", file);

  // send post request
  const response = await axiosInstance.post(`${API_URL}/upload/images`, data);

  // return the image url
  const imageUrl = response.data.url;
  // const imageUrl = `${API_URL}/uploads/images/${filename}`;

  return imageUrl;
}

export const reactQuillModules = {
  toolbar: {
    container: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video", "formula"],
      ["clean"],
    ],
  },
};

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  const [editorContent, setEditorContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string>();
  const [uploadLoading, setUploadLoading] = useState(false);
  const apiUrl = useApiUrl();

  useEffect(() => {
    //console.log(editorContent);
    if (imageUrl) {
      setUploadLoading(false);
    }
  }, [imageUrl, editorContent]);

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "username",
    optionValue: "_id",
  });

  const { selectProps: categorieSelectProps } = useSelect({
    resource: "post_categories",
    optionLabel: "name",
    optionValue: "_id",
  });

  const { selectProps: organisationsSelectProps } = useSelect({
    resource: "organisations",
    optionValue: "_id",
    optionLabel: "name",
  });

  const { selectProps: countrySelectProps } = useSelect({
    resource: "countries",
    optionValue: "_id",
    optionLabel: "translations.fra.common",
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

    // if (values.image && values.image.length) {
    //   const base64 = await file2Base64(values.image[0]);
    //   const url = await imageUploadHandler(base64);
    //   values.image = url;
    // }
    if (values.image) {
      values.image = imageUrl;
    }

    if (!values?.user) {
      values.user = null;
    }
    if (!values?.organisations) {
      values.organisations = null;
    }
    if (!values?.country) {
      values.country = null;
    }
    if (!values?.categorie) {
      values.categorie = null;
    }
    if (!values?.content) {
      values.content = null;
    }
    if (!values?.image) {
      values.image = null;
    }

    onFinish(values);
  }

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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

  return (
    <Create
      saveButtonProps={saveButtonProps}
      // intercept onSubmit to add the editor content to the form data
    >
      <Form {...formProps} layout="vertical" onFinish={onSubmitCapture}>
        <Form.Item label="Auteur" name={["user"]}>
          <Select {...userSelectProps} />
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
          <Select mode="multiple" {...organisationsSelectProps} />
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
        <Form.Item label="Pays" name={["country"]}>
          {/*<SelectCountry />*/}
          <Select
            {...countrySelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item
          label="Contenu"
          name={["content"]}
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
        {/* <Form.Item
          label="Slug"
          name={["slug"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item> */}
        {/* <Form.Item
          label="Contenu"
          name={["content"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          label="Couverture"
          name="image"
          // valuePropName="fileList"
          // getValueFromEvent={getValueFromEvent}
          // noStyle
        >
          {/* <Upload.Dragger
              name="file"
              action={`${API_URL}/upload/images`}
              // Define the body of the request
              listType="picture"
              maxCount={1}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger> */}
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {uploadLoading || !imageUrl ? (
              uploadButton
            ) : (
              <div style={{ position: "relative" }}>
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "5%",
                    right: "5%",
                    bottom: "5%",
                    color: "GrayText",
                  }}
                >
                  Modifier
                </span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="Categorie" name={["categorie"]}>
          <Select {...categorieSelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
