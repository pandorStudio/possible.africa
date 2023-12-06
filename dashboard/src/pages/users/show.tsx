import React, { useEffect } from "react";
import { IResourceComponentsProps, useMany, useShow } from "@refinedev/core";
import { EmailField, Show, TagField, TextField } from "@refinedev/antd";
import { Typography } from "antd";
import Link from "antd/es/typography/Link";

const { Title } = Typography;

export const CustomTextField = (props: any) => {
  switch (props.type) {
    case "text":
      return props.size && props.size === "large" ? (
        <TextField
          style={{
            fontSize: "1.2rem",
          }}
          value={props.value}
        />
      ) : (
        <TextField value={props.value} />
      );

    case "email":
      return props.size && props.size === "large" ? (
        <EmailField style={{ fontSize: "1.2rem" }} value={props.value} />
      ) : (
        <EmailField value={props.value} />
      );

    default:
      return <TextField value={props.value} />;
  }
};

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;
  const { data: originCountriesData, isLoading: originCountriesIsLoading } =
    useMany({
      resource: "countries",
      ids:
        record?.origin_countries?.map((item: any) => item?.origin_countries) ??
        [],
    });
  const { data: coveredCountriesData, isLoading: coveredCountryIsLoading } =
    useMany({
      resource: "countries",
      ids:
        record?.covered_countries?.map(
          (item: any) => item?.covered_countries
        ) ?? [],
    });
  const { data: userTypesData, isLoading: userTypesIsLoading } =
    useMany({
      resource: "user_types",
      ids:
        record?.categories?.map(
          (item: any) => item?.categories
        ) ?? [],
    });

  useEffect(() => {
    // console.log(record);
  }, [record]);

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Nom</Title>
      <CustomTextField type="text" size="large" value={record?.lastname} />
      <Title level={5}>Prénom(s)</Title>
      <CustomTextField type="text" size="large" value={record?.firstname} />
      <Title level={5}>Categories</Title>
      {userTypesIsLoading ? (
        <>Loading ...</>
      ) : userTypesData?.data?.length &&
        record?.categories?.length ? (
        <>
          {record?.categories?.map((categorie: any) => {
            // console.log(record);
            return <TagField key={categorie?._id} value={categorie?.name} />;
          })}
        </>
      ) : (
        "_"
      )}
      <Title level={5}>Email</Title>
      <CustomTextField type="email" size="large" value={record?.email} />
      <Title level={5}>Role</Title>
      <CustomTextField type="text" size="large" value={record?.role?.name} />
      <Title level={5}>Pays d'origine</Title>
      {originCountriesIsLoading ? (
        <>Loading ...</>
      ) : originCountriesData?.data?.length &&
        record?.origin_countries?.length ? (
        <>
          {record?.origin_countries?.map((country: any) => (
            <Link
              href={
                "https://www.google.com/maps/search/" +
                country?.translations?.fra?.common
              }
              target="_blank"
              key={country?._id}
            >
              {country?.translations?.fra?.common + " "}
            </Link>
          ))}
        </>
      ) : (
        "_"
      )}
      <Title level={5}>Pays couverts</Title>
      {coveredCountryIsLoading ? (
        <>Loading ...</>
      ) : coveredCountriesData?.data?.length &&
        record?.covered_countries?.length ? (
        <>
          {record?.covered_countries?.map((country: any) => {
            // console.log(record);
            return (
              <Link
                href={
                  "https://www.google.com/maps/search/" +
                  country?.translations?.fra?.common
                }
                target="_blank"
                key={country?._id}
              >
                {country?.translations?.fra?.common + " "}
              </Link>
            );
          })}
        </>
      ) : (
        "_"
      )}
      <Title level={5}>Nom d'utilisateur</Title>
      <CustomTextField type="text" size="large" value={record?.username} />
      <Title level={5}>Description</Title>
      <CustomTextField type="text" size="large" value={record?.description} />
      <Title level={5}>Genre</Title>
      <CustomTextField type="text" size="large" value={record?.gender} />
      <Title level={5}>Télephone</Title>
      {record?.phone ? (
        <Link
          href={
            "https://www.google.com/search?q=" +
            record?.phone?.indicatif +
            " " +
            record?.phone?.number
          }
          // href="#"
        >
          {record?.phone?.indicatif + " " + record?.phone?.number}
        </Link>
      ) : (
        "-"
      )}
      <Title level={5}>Email de contact</Title>

      <CustomTextField type="email" size="large" value={record?.address} />
      {/*{record?.address ? (*/}
      {/*  <Link*/}
      {/*    // href={"https://www.google.com/search?q=" + value}*/}
      {/*    href={"https://www.google.com/maps/search/" + record?.address}*/}
      {/*    target="_blank"*/}
      {/*  >*/}
      {/*    {record?.address}*/}
      {/*  </Link>*/}
      {/*) : (*/}
      {/*  "-"*/}
      {/*)}*/}

      <Title level={5}>Linkedin (URL)</Title>
      {record?.linkedin_url ? (
        <Link
          // href={"https://www.google.com/search?q=" + value}
          href={record?.linkedin_url}
          target="_blank"
        >
          {record?.linkedin_url}
        </Link>
      ) : (
        "-"
      )}

      <Title level={5}>Twitter (URL)</Title>
      {record?.twitter_url ? (
        <Link
          // href={"https://www.google.com/search?q=" + value}
          href={record?.twitter_url}
          target="_blank"
        >
          {record?.twitter_url}
        </Link>
      ) : (
        "-"
      )}

      <Title level={5}>Facebook (URL)</Title>
      {record?.facebook_url ? (
        <Link
          // href={"https://www.google.com/search?q=" + value}
          href={record?.facebook_url}
          target="_blank"
        >
          {record?.facebook_url}
        </Link>
      ) : (
        "-"
      )}
    </Show>
  );
};
