import React, { useEffect, useState } from "react";
import { IResourceComponentsProps, file2Base64 } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Space, Typography, Upload, message } from "antd";
import ReactQuill from "react-quill";
import { imageUploadHandler, reactQuillModules } from "../posts/create";
import { axiosInstance } from "../../authProvider";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export const OrganisationEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();

  const organisationsData = queryResult?.data?.data;

  const [editorContent, setEditorContent] = useState(
    organisationsData?.description
  );

  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [realPhoneNumber, setRealPhoneNumber] = React.useState("");
  const [indicatif, setIndicatif] = React.useState();
  const [countries, setCountries] = useState([]);
  
  const [imageUrlFromDb, setImageUrlFromDb] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>(organisationsData?.logo);
  const [uploadLoading, setUploadLoading] = useState(false);

  const { selectProps: typeSelectProps } = useSelect({
    resource: "organisation_types",
    optionValue: "_id",
    optionLabel: "name",
    defaultValue: organisationsData?.type?._id,
  });

  const { Text } = Typography;

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

    // if (values.image && values.image.length) {
    //   const base64 = await file2Base64(values.image[0]);
    //   const url = await imageUploadHandler(base64);
    //   values.image = url;
    // }
        if (values.logo) {
          values.logo = imageUrl;
        } else {
          values.logo = "";
        }

    if (!values?.contributeur?._id) {
      values.contributeur = null;
    }
    if (values.telephone) {
      // console.log(values.telephone);
      values.telephone = {
        indicatif: indicatif,
        number: realPhoneNumber,
      };
    }
    if (!values?.type?._id) {
      values.type = null;
    }
    // console.log(values);

    onFinish(values);
  }

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    let formattedNumber = value.replace(/\D/g, "");
    setRealPhoneNumber(formattedNumber);
    if (formattedNumber.length % 2 === 0) {
      formattedNumber = formattedNumber.replace(/(\d{2})/g, "$1 ");
    } else {
      formattedNumber = formattedNumber.replace(/(\d{3})/g, "$1 ");
    }
    if (formattedNumber.slice(-1) === " ")
      formattedNumber = formattedNumber.slice(0, formattedNumber.length - 1);
    // console.log(formattedNumber);
    setPhoneNumber(formattedNumber);
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
    if (imageUrl) {
      setUploadLoading(false);
    }
    if (organisationsData?.logo) {
      setImageUrlFromDb(organisationsData.logo);
    }
    if (organisationsData?.telephone) {
      setIndicatif(organisationsData?.telephone?.indicatif);
      setPhoneNumber(organisationsData?.telephone?.number);
    }
    if (!countries.length) {
      // Get all countries from api
      axiosInstance.get(`https://restcountries.com/v3.1/all`).then((res) => {
        const countrieDatas = res.data;

        let countrieDatasFiltered = [];

        for (let i = 0; i < countrieDatas.length; i++) {
          const countrieData = countrieDatas[i];
          if (countrieData.idd.root || countrieData.idd.suffixes) {
            countrieData.idd.suffixes.map((suffix) => {
              countrieDatasFiltered.push({
                ...countrieData,
                idd: { root: `${countrieData.idd.root}${suffix}` },
              });
            });
            // countrieDatasFiltered.push(countrieData);
          }
          continue;
        }

        // Filter countries by alphabetic order
        countrieDatasFiltered.sort((a: any, b: any) =>
          a.name.common > b.name.common ? 1 : -1
        );
        setCountries(countrieDatasFiltered);
      });
    }
  }, [imageUrl, countries, organisationsData, uploadLoading]);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmitCapture}>
        <Form.Item
          label="Name"
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
        <Form.Item label="Logo" name="logo">
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
          {/* </Form.Item> */}
        </Form.Item>
        <Form.Item label="Type" name={["type", "_id"]}>
          <Select {...typeSelectProps} />
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
        <Form.Item label="Email" name={["email"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Telephone" name={["telephone"]}>
          <Space.Compact style={{ width: "100%" }}>
            <Select
              style={{ width: "25%" }}
              value={indicatif}
              onChange={setIndicatif}
              placeholder="+000"
            >
              {countries.map((country, index) => (
                <Select.Option
                  key={country.name}
                  value={
                    // (country.flag ? country.flag + " " : "") +
                    (country.idd.root ? country.idd.root.toString() : "") +
                    (country.idd.suffixes
                      ? country.idd.suffixes.join("").toString()
                      : "")
                  }
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      textAlign: "start",
                    }}
                  >
                    <div
                      style={{
                        width: "35%",
                      }}
                    >
                      <Text style={{ textAlign: "start" }}>
                        {country.flag ? country.flag + " " : null}
                        {country.idd.root ? country.idd.root.toString() : null}
                        {country.idd.suffixes
                          ? country.idd.suffixes.join("").toString()
                          : null}
                      </Text>
                    </div>
                    <div
                      style={{
                        width: "60%",
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ textAlign: "start" }}>
                        {" " + country.name.common}
                      </Text>
                    </div>
                  </div>
                </Select.Option>
              ))}
            </Select>
            <Input
              style={{ width: "25%" }}
              onChange={handlePhoneNumberChange}
              value={phoneNumber}
              placeholder="26 88 88 88"
            />
          </Space.Compact>
        </Form.Item>
        <Form.Item label="Site Web" name={["site_web"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Url Linkedin" name={["linkedin_url"]}>
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
    </Edit>
  );
};
