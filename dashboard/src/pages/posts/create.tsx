import React, { useEffect, useState } from "react";
import { IResourceComponentsProps, file2Base64, useApiUrl } from "@refinedev/core";
import { Create, useForm, getValueFromEvent, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Upload } from "antd";
// import BasicEditor from "../../components/Editors/basic";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CustomAdvancedEditor } from "../../components/Editors/advanced";
import LexicalEditor from "../../components/Editors/lexical";
import "../../components/Editors/styles.css";
import { axiosInstance } from "../../authProvider";

const ENV = import.meta.env.VITE_NODE_ENV;
const API_URL =
  ENV === "developement"
    ? import.meta.env.VITE_BACKEND_DEV
    : import.meta.env.VITE_BACKEND_PROD;

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  const [editorContent, setEditorContent] = useState("");
  const apiUrl = useApiUrl();

  useEffect(() => {
    //console.log(editorContent);
  }, [editorContent]);

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
    const response = await axiosInstance.post(`${API_URL}/upload/images`, data);

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
    optionLabel: "name"
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

    if (values.image && values.image.length) {
      const base64 = await file2Base64(values.image[0]);
      const url = await imageUploadHandler(base64);
      values.image = url;
    }

    console.log(values);

    onFinish(values);
  }

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
        <Form.Item
          label="Pays"
          name={["country"]}
        >
          <Input />
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
            modules={modules}
            value={editorContent}
            onChange={setEditorContent}
            theme="snow"
            placeholder="Placez votre contenu ici..."
          />
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
        <Form.Item label="Couverture">
          <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            noStyle
          >
            <Upload.Dragger
              name="file"
              action={`${API_URL}/upload/images`}
              // Define the body of the request
              listType="picture"
              maxCount={1}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Categorie" name={["categorie"]}>
          <Select {...categorieSelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
