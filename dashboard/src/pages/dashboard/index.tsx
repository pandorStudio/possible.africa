import {
  useActiveAuthProvider,
  useApiUrl,
  useLink,
  useLogout,
  useRouterContext,
  useRouterType,
} from "@refinedev/core";
import { Card, Col, Row, Spin, Statistic } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../custom-data-provider/data-provider";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import CustomIconOrganisation from "../../custom-components/Icons/CustomIconOrganisation";
import CustomIconJob from "../../custom-components/Icons/CustomIconJob";
import CustomIconOpportunity from "../../custom-components/Icons/CustomIconOpportunity";
import CustomIconEvent from "../../custom-components/Icons/CustomIconEvent";
import CustomIconArticle from "../../custom-components/Icons/CustomIconArticle";
import { AdminOrContributorOrUser } from "../../custom-components/AccessControl";
import { useContextSelector } from "use-context-selector";
import { userContext } from "../../UserContext";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function CustomSpiner() {
  return <Spin indicator={antIcon} />;
}

export default function CustomDashboard() {
  const apiUrl = useApiUrl();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const routerType = useRouterType();
  const NewLink = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const Link = routerType === "legacy" ? LegacyLink : NewLink;
  const [token, setToken] = useState<string>(
    localStorage.getItem("refine-auth")
  );

  const authProvider = useActiveAuthProvider();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const userD = useContextSelector(userContext, (v) => v[0].user);

  useEffect(() => {
    if (dashboardData === null) {
      axiosInstance
        .get(`${apiUrl}/dashboard`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(true);
          setDashboardData(res.data);
          setLoading(false);
          // console.log(res);
          // console.log(dashboardData);
        })
        .catch((err) => {
          if (err?.response?.data?.message === "jwt expired") {
            mutateLogout();
          }
          console.log(err);
        });
    }
    // console.log(userD);
  }, [dashboardData, loading]);

  // if (!Object.keys(userD).length) <div>Chargement ...</div>;

  // if (userD?.role?.slug === "contact") return null;

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Link to="organisations">
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
          </Link>
        </Col>
        <Col span={6}>
          <Link to="jobs">
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
          </Link>
        </Col>
        <Col span={6}>
          <Link to="opportunities">
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
          </Link>
        </Col>
        <Col span={6}>
          <Link to="events">
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
          </Link>
        </Col>
        <Col span={6}>
          <Link to="posts">
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
          </Link>
        </Col>
        <AdminOrContributorOrUser>
          <Col span={6}>
            <Link to="users">
              <Card>
                {loading ? (
                  <CustomSpiner />
                ) : (
                  <Statistic
                    title={
                      <h3>
                        <UserOutlined
                          style={{
                            display: "inline-block",
                            marginRight: "8px",
                          }}
                        />
                        Total Utilisateurs
                      </h3>
                    }
                    value={dashboardData?.users}
                  />
                )}
              </Card>
            </Link>
          </Col>
        </AdminOrContributorOrUser>
      </Row>
      {/* Add more cards and statistics as needed */}
    </div>
  );
}
