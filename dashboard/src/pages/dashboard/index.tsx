import { useApiUrl } from "@refinedev/core";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../authProvider";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import CustomIconOrganisation from "../../custom-components/Icons/CustomIconOrganisation";
import CustomIconJob from "../../custom-components/Icons/CustomIconJob";
import CustomIconOpportunity from "../../custom-components/Icons/CustomIconOpportunity";
import CustomIconEvent from "../../custom-components/Icons/CustomIconEvent";
import CustomIconArticle from "../../custom-components/Icons/CustomIconArticle";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function CustomSpiner() {
  return <Spin indicator={antIcon} />;
}

export default function CustomDashboard() {
  const apiUrl = useApiUrl();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dashboardData === null) {
      axiosInstance
        .get(`${apiUrl}/dashboard`)
        .then((res) => {
          setLoading(true);
          setDashboardData(res.data);
          setLoading(false);
          console.log(dashboardData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dashboardData, loading]);
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            {loading ? (
              <CustomSpiner />
            ) : (
              <Statistic
                style={{ color: "red" }}
                title={
                  <h3>
                    <CustomIconOrganisation />
                    Total Organisations
                  </h3>
                }
                value={dashboardData?.organisations}
              />
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            {loading ? (
              <CustomSpiner />
            ) : (
              <Statistic
                title={
                  <h3>
                    <CustomIconJob />
                    Total Emplois
                  </h3>
                }
                value={dashboardData?.jobs}
              />
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            {loading ? (
              <CustomSpiner />
            ) : (
              <Statistic
                title={
                  <h3>
                    <CustomIconOpportunity />
                    Total Opportunités
                  </h3>
                }
                value={dashboardData?.opportunities}
              />
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            {loading ? (
              <CustomSpiner />
            ) : (
              <Statistic
                title={
                  <h3>
                    <CustomIconEvent />
                    Total Evènements
                  </h3>
                }
                value={dashboardData?.events}
              />
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            {loading ? (
              <CustomSpiner />
            ) : (
              <Statistic
                title={
                  <h3>
                    <CustomIconArticle />
                    Total Articles
                  </h3>
                }
                value={dashboardData?.posts}
              />
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            {loading ? (
              <CustomSpiner />
            ) : (
              <Statistic
                title={
                  <h3>
                    <UserOutlined style={{display: "inline-block", marginRight: "8px"}} />
                    Total Utilisateurs
                  </h3>
                }
                value={dashboardData?.users}
              />
            )}
          </Card>
        </Col>
        {/* <Col span={6}>
            <Card>
              <Statistic title="Total Orders" value={50} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Total Revenue" value={10000} prefix="$" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Average Rating" value={4.5} suffix="/ 5" />
            </Card>
          </Col> */}
      </Row>
      {/* Add more cards and statistics as needed */}
    </div>
  );
}
