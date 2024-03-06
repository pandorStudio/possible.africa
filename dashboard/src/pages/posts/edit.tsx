import React, { useEffect, useState } from "react";
import {
  file2Base64,
  IResourceComponentsProps,
  useApiUrl,
} from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, message, Select, Upload } from "antd";
import ReactQuill from "react-quill";
import { imageUploadHandler } from "./create";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

export const PostEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();

  const postsData = queryResult?.data?.data;

  const [imageUrlFromDb, setImageUrlFromDb] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>(postsData?.image);
  const [uploadLoading, setUploadLoading] = useState(false);

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

  // const { selectProps: userSelectProps } = useSelect({
  //   resource: "users",
  //   optionLabel: "username",
  //   optionValue: "_id",
  //   defaultValue: postsData?.user?._id,
  // });

  // const { selectProps: countriesSelectProps } = useSelect({
  //   resource: "countries",
  //   optionValue: "_id",
  //   optionLabel: "translations.fra.common",
  //   defaultValue: postsData?.countries?._id,
  // });

  // const { selectProps: categorieSelectProps } = useSelect({
  //   resource: "post_categories",
  //   optionLabel: "name",
  //   optionValue: "_id",
  //   defaultValue: postsData?.categorie?._id,
  // });

  // const { selectProps: organisationsSelectProps } = useSelect({
  //   resource: "organisations",
  //   optionValue: "_id",
  //   optionLabel: "name",
  //   defaultValue: postsData?.organisations?._id,
  // });

  // const { selectProps: authorSelectProps } = useSelect({
  //   resource: "users",
  //   optionLabel: "complete_name",
  //   optionValue: "_id",
  //   defaultValue: postsData?.authors?._id,
  //   // filters: [
  //   //   {
  //   //     field: "role",
  //   //     operator: "eq",
  //   //     value: "contact",
  //   //   },
  //   // ],
  // });

  // const { selectProps: labelSelectProps } = useSelect({
  //   resource: "post_labels",
  //   optionLabel: "name",
  //   optionValue: "_id",
  //   defaultValue: postsData?.labels?._id,
  // });

  // const { selectProps: editorSelectProps } = useSelect({
  //   resource: "organisations",
  //   optionValue: "_id",
  //   optionLabel: "name",
  //   defaultValue: postsData?.editors?._id,
  // });

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
    } else {
      values.image = "";
    }

    // if (!values?.user) {
    //   values.user = null;
    // }
    if (!values?.organisations) {
      values.organisations = null;
    }
    if (!values?.authors) {
      values.authors = null;
    }
    if (!values?.editors) {
      values.editors = null;
    }
    if (!values?.labels) {
      values.labels = null;
    }
    if (!values?.countries) {
      values.countries = null;
    }
    if (!values?.categorie?._id) {
      values.categorie = null;
    }
    if (!(editorContent && values?.content)) {
      values.content = null;
    }
    if (!values?.publication_language) {
      values.publication_language = null;
    }
    if (!values?.image) {
      values.image = null;
    }
    if (!values?.source) {
      values.source = null;
    }

    onFinish(values);
  }

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
    setImageUrl("");
    const base64 = await file2Base64(info.file);
    const url = await imageUploadHandler(base64);
    setImageUrl(url);
  };

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    // console.log(postsData);
    if (queryResult.isFetching) {
      setUploadLoading(true);
    }
    if (imageUrl) {
      setUploadLoading(false);
    }
    if (postsData?.content) {
      setEditorContent(postsData?.content);
    }
    if (postsData?.image) {
      setImageUrl(postsData?.image);
      setUploadLoading(false);
    }

    // console.log(queryResult.isFetching);
  }, [imageUrl, postsData, queryResult.isFetching, uploadLoading]);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmitCapture}>
        {/*<Form.Item label="Auteur" name={["user", "_id"]}>*/}
        {/*  <Select {...userSelectProps} />*/}
        {/*</Form.Item>*/}
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
        {/* <Form.Item label="Slug" name={["slug"]}>
          <Input />
        </Form.Item> */}
        <Form.Item label="Source" name={["airLink"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Langue" name={["airLanguage"]}>
          <Select>
            <Option value="FR">Français</Option>
            <Option value="ENG">Anglais</Option>
          </Select>
        </Form.Item>
        {/* <Form.Item
          label="Pays"
          name={["countries"]}
          getValueProps={(value: any[]) => {
            // console.log(value);
            return {
              value: value?.map((item) => {
                return item._id;
              }),
            };
          }}
          getValueFromEvent={(...args: any) => {
            const toBeReteurned = args[1].map((item: any) => {
              // console.log(...args);
              return { _id: item.value, name: item.label };
            });
            return toBeReteurned;
          }}
        >
          <Select
            mode="multiple"
            {...countriesSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item> */}
        <Form.Item label="Média" name={["airMedia"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Etiquettes" name={["airTags"]}>
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="Auteurs"
          name={["authors"]}
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
            key={authorSelectProps.value?.toString()}
            {...authorSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item> */}
        {/* <Form.Item
          label="Editeurs"
          name={["editors"]}
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
            key={editorSelectProps.value?.toString()}
            {...editorSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item> */}
        {/* <Form.Item
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
        </Form.Item> */}
        {/* <Form.Item name="image" label="Couverture">
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {uploadLoading || (!imageUrl && !imageUrlFromDb) ? (
              uploadButton
            ) : (
              <div style={{ position: "relative" }}>
                <img
                  src={imageUrl || imageUrlFromDb}
                  alt="avatar"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    color: "GrayText",
                    backgroundColor: "white",
                  }}
                >
                  Modifier
                </span>
              </div>
            )}
          </Upload>
        </Form.Item> */}
        {/* <Form.Item label="Categorie" name={["categorie", "_id"]}>
          <Select
            {...categorieSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item> */}
      </Form>
    </Edit>
  );
};
