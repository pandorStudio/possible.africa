import React, { useEffect } from "react";
import {
  IResourceComponentsProps,
  useMany,
  useOne,
  useShow,
} from "@refinedev/core";
import {
  BooleanField,
  DateField,
  DeleteButton,
  Show,
  TextField,
} from "@refinedev/antd";
import { Space, Typography } from "antd";
import parse from "html-react-parser";
import { htmlParseOptions } from "../posts/show";
import { Admin } from "../../custom-components/AccessControl";
import Link from "antd/es/typography/Link";

const { Title } = Typography;

export const OpportunityShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: organisationsData, isLoading: organisationsIsLoading } =
    useMany({
      resource: "organisations",
      ids: record?.organisations?.map((item: any) => item?.organisations) ?? [],
    });

  const { data: contactsData, isLoading: contactsIsLoading } = useMany({
    resource: "users",
    ids: record?.contacts?.map((item: any) => item?.contacts) ?? [],
  });
  const { data: targetsData, isLoading: targetsIsLoading } = useMany({
    resource: "users",
    ids: record?.targets?.map((item: any) => item?.targets) ?? [],
  });
  const { data: coveredCountriesData, isLoading: coveredCountryIsLoading } =
    useMany({
      resource: "countries",
      ids:
        record?.covered_countries?.map(
          (item: any) => item?.covered_countries
        ) ?? [],
    });

  const { data: userData, isLoading: userIsLoading } = useOne({
    resource: "users",
    id: record?.user || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: opportunityTypeData, isLoading: opportunityTypeIsLoading } =
    useOne({
      resource: "opportunity_types",
      id: record?.opportunity_type || "",
      queryOptions: {
        enabled: !!record,
      },
    });

  return (
    <Show
      isLoading={isLoading}
      headerProps={{
        extra: (
          <Admin>
            <Space>
              <DeleteButton recordItemId={record?.id} />
            </Space>
          </Admin>
        ),
      }}
    >
      <Title level={5}>Organisation</Title>
      {record?.organisation ? <>{organisationData?.data?.name || "-"}</> : "-"}
      <Title level={5}>Contributeur</Title>
      {userIsLoading ? <>Loading...</> : <>{userData?.data?.complete_name}</>}
      <Title level={5}>Titre</Title>
      <TextField value={record?.title} />
      <Title level={5}>Date de début</Title>
      <DateField value={record?.beginning_date} />
      <Title level={5}>Date de fin</Title>
      <DateField value={record?.ending_date} />
      <Title level={5}>Type d'opportunité</Title>
      {opportunityTypeIsLoading ? (
        <>Loading...</>
      ) : (
        <>{opportunityTypeData?.data?.name}</>
      )}
      <Title level={5}>Acteur Cible</Title>
      <TextField value={record?.target_people} />
      <Title level={5}>Pays cible</Title>
      {countryData?.data ? (
        <Link
          href={
            "https://www.google.com/maps/search/" +
            countryData?.data?.translations?.fra?.common
          }
          target="_blank"
        >
          {countryData?.data?.translations?.fra?.common}
        </Link>
      ) : (
        "-"
      )}
      <Title level={5}>Secteur d'activité</Title>
      <TextField value={record?.activity_area} />
      <Title level={5}>Description</Title>
      <span>
        {record?.description &&
          parse(
            record?.description.replace(/\\n/g, "<br />"),
            htmlParseOptions
          )}
      </span>
      <Title level={5}>Éligibilité</Title>
      <TextField value={record?.eligibility} />
      <Title level={5}>Processus</Title>
      <TextField value={record?.processus} />
      <Title level={5}>Bénefices</Title>
      <TextField value={record?.beneficies} />
      <Title level={5}>Lien d'inscription</Title>
      {record?.registration_link ? (
        <Link
          // href={"https://www.google.com/search?q=" + value}
          href={record?.registration_link}
          target="_blank"
        >
          {record?.registration_link}
        </Link>
      ) : (
        "-"
      )}
      <Title level={5}>Est Récurrent</Title>
      <BooleanField value={record?.isRecurrent} />
      <Title level={5}>Fréquence</Title>
      <TextField value={record?.frequency} />
    </Show>
  );
};
