import React, { useState } from "react";
import { IResourceComponentsProps, file2Base64, useApiUrl } from "@refinedev/core";
import { Create, getValueFromEvent, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Upload } from "antd";
import { axiosInstance } from "../../authProvider";
import ReactQuill from "react-quill";

export const OrganisationCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  const [editorContent, setEditorContent] = useState("");
  const apiUrl = useApiUrl();

    async function imageUploadHandler(image: any) {
      // build form data
      const bf = await fetch(image);
      const blob = await bf.blob();
      const file = new File([blob], "image." + blob.type.split("/")[1], {
        type: blob.type,
      });
      const data = new FormData();
      data.append("image", file);

      // send post request
      const response = await axiosInstance.post(
        `${apiUrl}/upload/images`,
        data
      );

      // return the image url
      const imageUrl = response.data.url;
      // const imageUrl = `${API_URL}/uploads/images/${filename}`;

      return imageUrl;
  }
  
    const modules = {
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
    if (!values?.contributeur?._id) {
      values.contributeur = null;
    }
    if (!values?.type?._id) {
      values.type = null;
    }
    console.log(values);

    onFinish(values);
  }

  const { selectProps: contributorSelectProps } = useSelect({
    resource: "users?role=contributor",
    optionValue: "_id",
    optionLabel: "username",
    defaultValue: ""
  });

  const { selectProps: organisationTypeSelectProps } = useSelect({
    resource: "organisation_types",
    optionValue: "_id",
    optionLabel: "name",
    defaultValue: ""
  });

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
        <Form.Item label="Logo">
          <Form.Item
            name="logo"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            noStyle
          >
            <Upload.Dragger
              name="file"
              action={`${apiUrl}/upload/images`}
              // Define the body of the request
              listType="picture"
              maxCount={1}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Type" name={["type", "_id"]}>
          <Select {...organisationTypeSelectProps} />
        </Form.Item>
        <Form.Item label="Contributeur" name={["contributeur", "_id"]}>
          <Select {...contributorSelectProps} />
        </Form.Item>

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
            modules={modules}
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
