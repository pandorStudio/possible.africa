import React, { useEffect, useState } from "react";
import {
  file2Base64,
  IResourceComponentsProps,
  RegisterFormTypes,
  useApiUrl,
} from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, message, Select, Space, Typography, Upload } from "antd";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { imageUploadHandler } from "../posts/create";
import { axiosInstance } from "../../custom-data-provider/data-provider";
import CustomFormDivider from "../../custom-components/FormDivider";

const { Option } = Select;

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const [form] = Form.useForm<RegisterFormTypes>();
  const { formProps, saveButtonProps, onFinish } = useForm();
  const { selectProps: roleSelectProps } = useSelect({
    resource: "user_roles",
    optionValue: "_id",
    optionLabel: "name",
  });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [realPhoneNumber, setRealPhoneNumber] = useState("");
  const [indicatif, setIndicatif] = useState();
  const [countries, setCountries] = useState([]);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const { Text } = Typography;

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

  useEffect(() => {
    if (imageUrl) {
      setUploadLoading(false);
    }

    if (!countries.length) {
      // Get all countries from api
      axiosInstance
        .get(`https://restcountries.com/v3.1/all`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
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
            a?.translations?.fra?.common > b?.translations?.fra?.common ? 1 : -1
          );
          setCountries(countrieDatasFiltered);
        });
    }
  }, [imageUrl, countries, uploadLoading]);

  const apiUrl = useApiUrl();

  const { selectProps: originCountriesSelectProps } = useSelect({
    resource: "countries",
    optionValue: "_id",
    optionLabel: "translations.fra.common",
  });

  const { selectProps: coveredCountriesSelectProps } = useSelect({
    resource: "countries",
    optionValue: "_id",
    optionLabel: "translations.fra.common",
  });

  const { selectProps: userTypesSelectProps } = useSelect({
    resource: "user_types",
    optionValue: "_id",
    optionLabel: "name",
  });

  async function onSubmitCapture(values: any) {
    if (values.avatar) {
      values.avatar = imageUrl;
    } else {
      values.avatar = "";
    }
    if (!values?.covered_countries) {
      values.covered_countries = null;
    }
    if (!values?.origin_countries) {
      values.origin_countries = null;
    }
    if (!values?.categories) {
      values.categories = null;
    }

    if (values.phone) {
      // console.log(values.telephone);
      values.phone = {
        indicatif: indicatif,
        number: realPhoneNumber,
      };
    }
    onFinish(values);
  }

  const validatePassword = (_: any, value: string | undefined) => {
    if (value && value !== password) {
      return Promise.reject(
        new Error("Les deux mots de passe ne sont pas identiques.")
      );
    }

    return Promise.resolve();
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmitCapture}>
        <CustomFormDivider text="Informations de connexion" />
        <Form.Item
          label="Role"
          name={["role", "_id"]}
          rules={[
            {
              required: true,
              message: "Veuillez renseigner le champ role.",
            },
          ]}
        >
          <Select
            {...roleSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item label="Email" name={["email"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mot de passe" name={["password"]}>
          <Input.Password
            placeholder="●●●●●●●●"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Confirmer le mot de passe"
          name={["confirmPassword"]}
          rules={[{ validator: validatePassword }]}
        >
          <Input.Password placeholder="●●●●●●●●" />
        </Form.Item>
        <CustomFormDivider text="Informations personnelles" />
        <Form.Item
          label="Prénom"
          name={["firstname"]}
          rules={[
            {
              required: true,
              message: "Veuillez renseigner le champ prénom.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Nom" name={["lastname"]}>
          <Input />
        </Form.Item>
        {/* Create avatar upload input */}
        <Form.Item label="Photo de profil" name={["avatar"]}>
          <Upload
            name="avatar"
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
        </Form.Item>
        <Form.Item
          label="Catégories"
          name={["categories"]}
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
          {/*<SelectCountry />*/}
          <Select
            mode="multiple"
            {...userTypesSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item label="Description" name={["description"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Genre" name={["gender"]}>
          <Select defaultValue="f" style={{ width: 120 }}>
            <Option value="f">Féminin</Option>
            <Option value="m">Masculin</Option>
            <Option value="o">Autres</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Pays d'origine"
          name={["origin_countries"]}
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
          {/*<SelectCountry />*/}
          <Select
            mode="multiple"
            {...originCountriesSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item
          label="Pays couvert"
          name={["covered_countries"]}
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
          {/*<SelectCountry />*/}
          <Select
            mode="multiple"
            {...coveredCountriesSelectProps}
            onSearch={undefined}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <CustomFormDivider text="Coordonnées" />
        <Form.Item label="Numéro de téléphone" name={["phone"]}>
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
                        {" " + country?.translations?.fra?.common}
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
        <Form.Item label="Email de contact" name={["address"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Linkedin (URL)" name={["linkedin_profile"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Twitter (URL)" name={["twitter_profile"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Facebook (URL)" name={["facebook_profile"]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
