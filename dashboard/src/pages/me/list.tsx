import React, { useEffect, useState } from "react";
import {
  IResourceComponentsProps,
  useLink,
  useRouterContext,
  useRouterType,
  useTranslate,
} from "@refinedev/core";

import { TagField, Title, useTable } from "@refinedev/antd";
import { Avatar, Button, Card, Col, Row, Space, Typography } from "antd";
import { AdminOrContributor } from "../../custom-components/AccessControl";

export const Profil: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable({
    resource: "profil",
    syncWithLocation: true,
  });
  const [userConnected, setUserConnected] = useState(null);
  const routerType = useRouterType();
  const NewLink = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const Link = routerType === "legacy" ? LegacyLink : NewLink;
  const { Text, Title } = Typography;

  useEffect(() => {
    if (tableProps?.dataSource?.length > 0) {
      setUserConnected(tableProps?.dataSource[0]);
    }
    // console.log(userConnected);
  }, [tableProps]);

  return (
    <>
      {userConnected ? (
        <Row
          gutter={[16, 16]}
          style={{
            marginBottom: 20,
          }}
        >
          <Col span={24}>
            <Card
              title="Mon Profil"
              extra={
                <AdminOrContributor>
                  <Link to={`edit/${userConnected?._id}`}>
                    <button className="btn-primary">Modifier</button>
                  </Link>
                </AdminOrContributor>
              }
            >
              <Row gutter={[16, 16]}>
                <>
                  <Col span={24}>
                    <Space direction="horizontal">
                      <Avatar
                        size={100}
                        src={
                          userConnected?.avatar ||
                          "https://possibledotafrica.s3.eu-west-3.amazonaws.com/users/images/1688567211420-image.png"
                        }
                      />
                      <Space direction="vertical">
                        <Title
                          level={3}
                        >{`${userConnected?.firstname} ${userConnected?.lastname}`}</Title>
                        <Title level={4}>{userConnected?.username}</Title>
                      </Space>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Title level={4}>Email :</Title>
                      <Text
                        style={{
                          fontSize: 16,
                          display: "inline-block",
                          marginBottom: 10,
                          marginLeft: 20,
                        }}
                      >
                        {userConnected?.email || "-"}
                      </Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Title level={4}>Description :</Title>
                      <Text
                        style={{
                          fontSize: 16,
                          display: "inline-block",
                          marginBottom: 10,
                          marginLeft: 20,
                        }}
                      >
                        {userConnected?.description || "-"}
                      </Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Title level={4}>Pays d'origine :</Title>
                      {userConnected?.origin_countries?.length
                        ? userConnected?.origin_countries.map((country) => (
                            <TagField
                              value={country?.translations?.fra?.common}
                            />
                          ))
                        : "-"}
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Title level={4}>Pays couvert :</Title>
                      {userConnected?.covered_countries?.length
                        ? userConnected?.covered_countries.map((country) => (
                            <TagField
                              value={country?.translations?.fra?.common}
                            />
                          ))
                        : "-"}
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Title level={4}>Role :</Title>
                      <Text
                        style={{
                          fontSize: 16,
                          display: "inline-block",
                          marginBottom: 10,
                          marginLeft: 20,
                        }}
                      >
                        {userConnected?.role?.name || "-"}
                      </Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Title level={4}>Genre :</Title>
                      <Text
                        style={{
                          fontSize: 16,
                          display: "inline-block",
                          marginBottom: 10,
                          marginLeft: 20,
                        }}
                      >
                        {userConnected?.gender === "m"
                          ? "Masculin"
                          : userConnected?.gender === "f"
                          ? "Féminin"
                          : "Autre"}
                      </Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Title level={4}>Téléphone :</Title>
                      <Text
                        style={{
                          fontSize: 16,
                          display: "inline-block",
                          marginBottom: 10,
                          marginLeft: 20,
                        }}
                      >
                        {userConnected?.phone?.indicatif +
                          " " +
                          userConnected?.phone?.number || "-"}
                      </Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Title level={4}>Addresse :</Title>
                      <Text
                        style={{
                          fontSize: 16,
                          display: "inline-block",
                          marginBottom: 10,
                          marginLeft: 20,
                        }}
                      >
                        {userConnected?.address || "-"}
                      </Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Title level={4}>Profile Facebook :</Title>
                      <Text
                        style={{
                          fontSize: 16,
                          display: "inline-block",
                          marginBottom: 10,
                          marginLeft: 20,
                        }}
                      >
                        {userConnected?.facebook_profile || "-"}
                      </Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Title level={4}>Profile Twitter :</Title>
                      <Text
                        style={{
                          fontSize: 16,
                          display: "inline-block",
                          marginBottom: 10,
                          marginLeft: 20,
                        }}
                      >
                        {userConnected?.twitter_profile || "-"}
                      </Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Title level={4}>Profile Linkedin :</Title>
                      <Text
                        style={{
                          fontSize: 16,
                          display: "inline-block",
                          marginBottom: 10,
                          marginLeft: 20,
                        }}
                      >
                        {userConnected?.linkedin_profile || "-"}
                      </Text>
                    </Space>
                  </Col>
                </>
              </Row>
            </Card>
          </Col>
        </Row>
      ) : (
        <Col
          span={24}
          style={{
            display: "block",
            borderRadius: 10,
          }}
        >
          <Space
            direction="horizontal"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                display: "inline-block",
                width: "100%",
                backgroundColor: "#fff",
                padding: 10,
              }}
            >
              Chargement du profil ...
            </Text>
          </Space>
        </Col>
      )}
    </>
  );
};
