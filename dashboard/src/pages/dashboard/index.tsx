import {
  useActiveAuthProvider,
  useApiUrl,
  useLink,
  useLogout,
  useRouterContext,
  useRouterType,
} from "@refinedev/core";
import { Card, Col, Row, Spin, Statistic, Button } from "antd";
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
import ReactApexChart from "react-apexcharts";
import RadialBarChart from "../../custom-components/RadialBarChart";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function CustomSpiner(props) {
  return <Spin {...props} indicator={antIcon} />;
}

export default function CustomDashboard() {
  const apiUrl = useApiUrl();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [synchWithAirtable, setSynchWithAirTable] = useState(false);
  const [synchWithArticleAirtable, setSynchWithArticleAirTable] =
    useState(false);

  const routerType = useRouterType();
  const NewLink = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const Link = routerType === "legacy" ? LegacyLink : NewLink;
  const [token, setToken] = useState<string>(
    localStorage.getItem("refine-auth")
  );

  const [organisationPeriode, setOrganisationsPeriode] = useState("week");
  const [postsPeriode, setPostsPeriode] = useState("week");

  const authProvider = useActiveAuthProvider();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const userD = useContextSelector(userContext, (v) => v[0].user);

  const organisationOptions = {
    chart: {
      height: 170,
      type: "radialBar",
    },
    series: [dashboardData?.organisations[organisationPeriode].evolution || 0],
    colors: ["#6cd9cb"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "80%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    // fill: {
    //   type: "gradient",
    //   gradient: {
    //     shade: "dark",
    //     type: "vertical",
    //     gradientColors: ["#2bb19c"],
    //     stops: [0, 100],
    //   },
    // },
    stroke: {
      lineCap: "round",
    },
    labels: ["Organisations"],
  };

  const postsOptions = {
    chart: {
      height: 170,
      type: "radialBar",
    },
    series: [dashboardData?.posts[postsPeriode].evolution || 0],
    colors: ["#6cd9cb"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "80%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    // fill: {
    //   type: "gradient",
    //   gradient: {
    //     shade: "dark",
    //     type: "vertical",
    //     gradientColors: ["#2bb19c"],
    //     stops: [0, 100],
    //   },
    // },
    stroke: {
      lineCap: "round",
    },
    labels: ["Articles"],
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    if (dashboardData === null) {
      setLoading(true);
      axiosInstance
        .get(`${apiUrl}/dashboard`)
        .then((res) => {
          setDashboardData(res.data);
          setLoading(false);
          console.log(res);
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
  }, [dashboardData, dashboardData?.data?.organisations, loading]);

  // if (!Object.keys(userD).length) <div>Chargement ...</div>;

  // if (userD?.role?.slug === "contact") return null;

  return (
    <div>
      {/* <Row gutter={[16, 16]}>
        <Col span={6}>
          <Link to="organisations">
            <Card>
              {loading ? (
                <CustomSpiner />
              ) : (
                <>
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
                  <div
                    style={{
                      display: "flex",
                      marginTop: "1rem",
                    }}
                  >
                    <button className="btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        console.log(e);
                        setSynchWithAirTable(true);
                        axiosInstance
                          .get(`${apiUrl}/airtable_organisations`)
                          .then((res) => {
                            setSynchWithAirTable(false);
                            setLoading(true);
                            axiosInstance
                              .get(`${apiUrl}/dashboard`)
                              .then((res) => {
                                setDashboardData(res.data);
                                setLoading(false);
                              })
                              .catch((err) => {
                                if (
                                  err?.response?.data?.message === "jwt expired"
                                ) {
                                  mutateLogout();
                                }
                                console.log(err);
                              });
                          })
                          .catch((err) => {
                            if (
                              err?.response?.data?.message === "jwt expired"
                            ) {
                              mutateLogout();
                            }
                            console.log(err);
                          });
                      }}
                      
                    >
                      Synchroniser avec Airtable{" "}
                      {synchWithAirtable ? (
                        <CustomSpiner
                          style={{ color: "white", marginLeft: "8px" }}
                        />
                      ) : null}
                    </button>
                  </div>
                </>
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
                <>
                  <Statistic
                    title={
                      <h3>
                        <CustomIconArticle />
                        Total Articles
                      </h3>
                    }
                    value={dashboardData?.posts}
                  />

                  <div
                    style={{
                      display: "flex",
                      marginTop: "1rem",
                    }}
                  >
                    <button className="btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        console.log(e);
                            setSynchWithArticleAirTable(false);
                        axiosInstance
                          .get(`${apiUrl}/airtable_posts/all`)
                          .then((res) => {
                            setSynchWithArticleAirTable(false);
                            setLoading(true);
                            axiosInstance
                              .get(`${apiUrl}/dashboard`)
                              .then((res) => {
                                setDashboardData(res.data);
                                setLoading(false);
                              })
                              .catch((err) => {
                                if (
                                  err?.response?.data?.message === "jwt expired"
                                ) {
                                  mutateLogout();
                                }
                                console.log(err);
                              });
                          })
                          .catch((err) => {
                            if (
                              err?.response?.data?.message === "jwt expired"
                            ) {
                              mutateLogout();
                            }
                            console.log(err);
                          });
                      }}
                      
                    >
                      Synchroniser avec Airtable{" "}
                      {synchWithArticleAirtable ? (
                        <CustomSpiner
                          style={{ color: "white", marginLeft: "8px" }}
                        />
                      ) : null}
                    </button>
                  </div>
                </>
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
      </Row> */}
      {/* Add more cards and statistics as needed */}
      <div className="grid grid-cols-12 2xl:grid-cols-12 gap-x-5">
        <div className="col-span-12 md:order-3 lg:col-span-6 2xl:col-span-3 card">
          <div className="card-body">
            <div className="grid grid-cols-12">
              <div className="col-span-7 md:col-span-7">
                <p className="text-slate-500 dark:text-slate-200">
                  Total Organisations
                </p>
                <h5 className="mt-3 mb-4">
                  <span
                    className="counter-value text-[#6cd9cb] text-5xl"
                    data-target="615"
                  >
                    {dashboardData?.organisations?.all || 0}
                  </span>
                </h5>
                <button
                  className="btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    console.log(e);
                    setSynchWithAirTable(true);
                    axiosInstance
                      .get(`${apiUrl}/airtable_organisations`)
                      .then((res) => {
                        setSynchWithAirTable(false);
                        setLoading(true);
                        axiosInstance
                          .get(`${apiUrl}/dashboard`)
                          .then((res) => {
                            setDashboardData(res.data);
                            setLoading(false);
                          })
                          .catch((err) => {
                            if (
                              err?.response?.data?.message === "jwt expired"
                            ) {
                              mutateLogout();
                            }
                            console.log(err);
                          });
                      })
                      .catch((err) => {
                        if (err?.response?.data?.message === "jwt expired") {
                          mutateLogout();
                        }
                        console.log(err);
                      });
                  }}
                >
                  {synchWithAirtable ? "Synchronisation" : "Synchroniser"}

                  {synchWithAirtable ? (
                    <CustomSpiner
                      style={{ color: "white", marginLeft: "8px" }}
                    />
                  ) : null}
                </button>
              </div>
              <div className="col-span-5 md:col-span-5">
                <RadialBarChart className="" options={organisationOptions} />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <p className="text-slate-500 dark:text-slate-200 grow">
                <span className="font-semibold text-xl text-[#6cd9cb]">
                  {dashboardData?.organisations[organisationPeriode].length ||
                    0}
                </span>{" "}
                Nouvelles Organisations
              </p>
              <p className="text-slate-500 dark:text-slate-200">
                <select
                  name="periode"
                  className="bg-transparent border border-[#6cd9cb] px-2 py-1 rounded-md"
                  id=""
                  value={organisationPeriode}
                  onChange={(e) => setOrganisationsPeriode(e.target.value)}
                >
                  <option value="year">Cette Année</option>
                  <option value="month">Cet Mois</option>
                  <option value="week">Cette Semaine</option>
                  <option value="day">Aujourd'hui</option>
                </select>
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:order-3 lg:col-span-6 2xl:col-span-3 card">
          <div className="card-body">
            <div className="grid grid-cols-12">
              <div className="col-span-7 md:col-span-7">
                <p className="text-slate-500 dark:text-slate-200">
                  Total Articles
                </p>
                <h5 className="mt-3 mb-4">
                  <span
                    className="counter-value text-[#6cd9cb] text-5xl"
                    data-target="615"
                  >
                    {dashboardData?.posts?.all || 0}
                  </span>
                </h5>
                <button
                  className="btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    console.log(e);
                    setSynchWithArticleAirTable(true);
                    axiosInstance
                      .get(`${apiUrl}/airtable_posts/all`)
                      .then((res) => {
                        setSynchWithArticleAirTable(false);
                        setLoading(true);
                        axiosInstance
                          .get(`${apiUrl}/dashboard`)
                          .then((res) => {
                            setDashboardData(res.data);
                            setLoading(false);
                          })
                          .catch((err) => {
                            if (
                              err?.response?.data?.message === "jwt expired"
                            ) {
                              mutateLogout();
                            }
                            console.log(err);
                          });
                      })
                      .catch((err) => {
                        if (err?.response?.data?.message === "jwt expired") {
                          mutateLogout();
                        }
                        console.log(err);
                      });
                  }}
                >
                  {synchWithArticleAirtable
                    ? "Synchronisation"
                    : "Synchroniser"}
                  {synchWithArticleAirtable ? (
                    <CustomSpiner
                      style={{ color: "white", marginLeft: "8px" }}
                    />
                  ) : null}
                </button>
              </div>
              <div className="col-span-5 md:col-span-5">
                <RadialBarChart className="" options={postsOptions} />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <p className="text-slate-500 dark:text-slate-200 grow">
                <span className="font-semibold text-xl text-[#6cd9cb]">
                  {dashboardData?.posts[postsPeriode].length || 0}
                </span>{" "}
                Nouveaux Articles
              </p>
              <p className="text-slate-500 dark:text-slate-200">
                <select
                  name="periode"
                  className="bg-transparent border border-[#6cd9cb] px-2 py-1 rounded-md"
                  id=""
                  value={postsPeriode}
                  onChange={(e) => setPostsPeriode(e.target.value)}
                >
                  <option value="year">Cette Année</option>
                  <option value="month">Cet Mois</option>
                  <option value="week">Cette Semaine</option>
                  <option value="day">Aujourd'hui</option>
                </select>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
