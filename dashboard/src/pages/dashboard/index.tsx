import { useApiUrl } from "@refinedev/core";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../authProvider";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function CustomSpiner() {
  return <Spin indicator={antIcon} />;
}

export default function CustomDashboard() {
  const apiUrl = useApiUrl();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`${apiUrl}/dashboard`)
      .then((res) => {
        setDashboardData(res.data);
        // console.log(dashboardData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dashboardData]);
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            {dashboardData?.organisations ? (
              <Statistic
                style={{ color: "red" }}
                title="Total Organisations"
                value={
                  dashboardData?.organisations || <Spin indicator={antIcon} />
                }
              />
            ) : (
              <CustomSpiner />
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            {dashboardData?.organisations ? (
              <Statistic
                title="Total Emplois"
                value={dashboardData?.jobs || <CustomSpiner />}
              />
            ) : (
              <CustomSpiner />
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            {dashboardData?.organisations ? (
              <Statistic
                title="Total Opportunités"
                value={dashboardData?.opportunities || <CustomSpiner />}
              />
            ) : (
              <CustomSpiner />
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            {dashboardData?.organisations ? (
              <Statistic
                title="Total Evènements"
                value={dashboardData?.events || <CustomSpiner />}
              />
            ) : (
              <CustomSpiner />
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            {dashboardData?.organisations ? (
              <Statistic
                title="Total Articles"
                value={dashboardData?.posts || <CustomSpiner />}
              />
            ) : (
              <CustomSpiner />
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            {dashboardData?.organisations ? (
              <Statistic
                title="Total Utilisateurs"
                value={dashboardData?.users || <CustomSpiner />}
              />
            ) : (
              <CustomSpiner />
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
