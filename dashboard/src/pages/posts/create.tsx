import React, { useEffect, useState } from "react";
import { IResourceComponentsProps, useNavigation } from "@refinedev/core";
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
  const { formProps, saveButtonProps, queryResult, onFinish, o } = useForm();
  const [editorContent, setEditorContent] = useState("");
  const { list } = useNavigation();

  useEffect(() => {
    console.log(editorContent);
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
    const response = await axiosInstance.post(`${API_URL}/upload`, data);

    // return the image url
    const filename = response.data.filename;
    const imageUrl = `${API_URL}/uploads/images/${filename}`;

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

  async function onSubmitCapture(e: any) {
    e.preventDefault();
    console.log("onSubmitCapture");
    console.log(e);
    console.log(formProps.form.getFieldsValue());
    console.log(editorContent);
    const values: any = formProps.form.getFieldsValue();
    //@ts-ignore
    onFinish(data);

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

      imgs.map(async (img) => {
        img.url = await imageUploadHandler(img.base64);
        console.log(img.url);
        setEditorContent((s) => s.replace(img.base64, img.url));
      });
      values.content = editorContent;
    }
    console.log(values);

    // redirect to the list page discarding the form data
    // list("/posts", "replace");

    onFinish(values);

    // const data = formProps.form.getFieldsValue();
    // console.log(data);
    // const response = await axiosInstance.post(`${API_URL}/posts`, data);
    
  }

  return (
    <Create
      saveButtonProps={saveButtonProps}
      // intercept onSubmit to add the editor content to the form data
    >
      <Form {...formProps} layout="vertical" onSubmitCapture={onSubmitCapture}>
        <Form.Item
          label="Auteur"
          name={["user"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...userSelectProps} />
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
        {/* <div>
          <BasicEditor />
        </div> */}
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
          {/* <CustomAdvancedEditor /> */}
          {/* <LexicalEditor style={{
            border: "1px solid #d9d9d9",
          }} /> */}
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
        <Form.Item label="Image">
          <Form.Item
            name="image"
            getValueProps={(value) => ({
              fileList: [{ url: value, name: value, uid: value }],
            })}
            getValueFromEvent={getValueFromEvent}
            noStyle
          >
            <Upload.Dragger listType="picture" beforeUpload={() => false}>
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Categorie"
          name={["categorie"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorieSelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
