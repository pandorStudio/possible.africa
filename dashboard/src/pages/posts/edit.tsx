import React, { useEffect, useState } from "react";
import { IResourceComponentsProps, file2Base64, useApiUrl } from "@refinedev/core";
import { Edit, useForm, getValueFromEvent, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Upload } from "antd";
import ReactQuill from "react-quill";

export const PostEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const postsData = queryResult?.data?.data;

  const API_URL = useApiUrl();

  // useEffect(() => { 
  //   console.log(postsData);
  // }, [postsData]);

  const [editorContent, setEditorContent] = useState(postsData?.content);

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "username",
    optionValue: "_id",
    defaultValue: postsData?.user?._id,
  });

  const { selectProps: categorieSelectProps } = useSelect({
    resource: "post_categories",
    optionLabel: "name",
    optionValue: "_id",
    defaultValue: postsData?.categorie?._id,
  });

  const { selectProps: organisationsSelectProps } = useSelect({
    resource: "organisations",
    optionValue: "_id",
    optionLabel: "name",
    defaultValue: postsData?._id,
  });

  function handleImgSubmit(event: any) {
    console.log(event);
    event.preventDefault();
  }

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Auteur"
          name={["user", "_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...userSelectProps} />
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
            key={organisationsSelectProps.value?.toString()}
            {...organisationsSelectProps}
          />
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
          label="Slug"
          name={["slug"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
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
          label="Contenu"
          name={["content"]}
          rules={[
            {
              required: true,
            },
          ]}
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
            modules={modules}
            value={editorContent}
            onChange={setEditorContent}
            theme="snow"
            placeholder="Placez votre contenu ici..."
          />
        </Form.Item>
        <Form.Item label="Couverture">
          <Form.Item
            name="image"
            valuePropName="fileList"
            getValueProps={(value: any[]) => {
              return {
                fileList: [{ url: value, name: value }],
              };
            }}
            getValueFromEvent={(...args: any) => {
              console.log(args);
             }}
            noStyle
          >
            <Upload.Dragger
              name="file"
              action={`${API_URL}/upload/images`}
              beforeUpload={(...args: any) => {
                const file = args[0];
                return {image: file}
               }}
              // Define the body of the request
              listType="picture"
              maxCount={1}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Categorie"
          name={["categorie", "_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorieSelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
