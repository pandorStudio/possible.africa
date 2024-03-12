import React, { useEffect, useRef, useState } from "react";
import {
  BaseRecord,
  IResourceComponentsProps,
  useApiUrl,
  useInvalidate,
  useMany,
} from "@refinedev/core";
import {
  BooleanField,
  CreateButton,
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  TagField,
  useTable,
} from "@refinedev/antd";
import { Button, Checkbox, Input, message, Modal, Space, Table } from "antd";
import { axiosInstance } from "../../custom-data-provider/data-provider";
import papa from "papaparse";
import Link from "antd/es/typography/Link";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Admin,
  AdminOrContributor,
} from "../../custom-components/AccessControl";

export const OpportunityList: React.FC<IResourceComponentsProps> = () => {
  const [importLoading, setImportLoading] = useState(false);
  const fileImportInput = useRef(null);
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  const apiUrl = useApiUrl();
  const [checkedArray, setCheckedArray] = useState([]);
  const [allCheckedOnPage, setAllCheckedOnPage] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modal, modalContextHolder] = Modal.useModal();
  const [pageCheckboxes, setPageCheckboxes] = useState([]);
  const [visibleCheckAll, setVisibleCheckAll] = useState(false);
  const invalidate = useInvalidate();
  let checkboxRefs = useRef([]);

  const { data: contactsData, isLoading: contactsIsLoading } = useMany({
    resource: "users",
    ids: tableProps?.dataSource?.map((item) => item?.contacts) ?? [],
  });

  const { data: activityAreasData, isLoading: activityAreasIsLoading } =
    useMany({
      resource: "activity_areas",
      ids: tableProps?.dataSource?.map((item) => item?.activity_areas) ?? [],
    });

  const { data: targetCountriesData, isLoading: targetCountriesIsLoading } =
    useMany({
      resource: "countries",
      ids: tableProps?.dataSource?.map((item) => item?.target_countries) ?? [],
    });
  const { data: organisationsData, isLoading: organisationsIsLoading } =
    useMany({
      resource: "organisations",
      ids: tableProps?.dataSource?.map((item) => item?.organisations) ?? [],
    });
  const { data: targetsData, isLoading: targetsIsLoading } = useMany({
    resource: "opportunity_targets",
    ids: tableProps?.dataSource?.map((item) => item?.targets) ?? [],
  });

  async function handleImport(e: any) {
    const file = e.target.files[0];
    let headers: any[] = [];
    let body: any[] = [];
    papa.parse(file, {
      complete: async function (results) {
        results.data.map(async (el: any, i) => {
          if (i === 0) {
            headers.push(...el);
          } else {
            const ob: any = {
              title: el[0],
              beginning_date: el[1],
              ending_date: el[2],
              // target_country: el[3],
              description: el[3],
              // eligibility: el[4],
              // processus: el[5],
              // beneficies: el[6],
              registration_link: el[4],
              isRecurrent: el[5],
              frequency: el[6],
            };
            body.push({ ...ob });
            // await axios.post(apiUrl + "/organisations", el);
            setImportLoading(true);
            await axiosInstance
              .post(
                apiUrl + "/opportunities",
                {
                  ...ob,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                // console.log(response);
                setImportLoading(false);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        });
      },
    });
    // console.log(body);
    let results = body.forEach(async (el) => {
      // console.log(el);
      //await axios.put("http://localhost:5000", el);
    });

    // console.log(results);
  }

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (importLoading) {
      messageApi.open({
        type: "loading",
        content: "Veuillez patienter pendant que nous importons les données.",
        duration: 0,
      });
    }
    if (!importLoading) {
      messageApi.destroy();
      invalidate({
        resource: "opportunities",
        invalidates: ["list"],
      });
    }
    if (checkedArray.length >= pageCheckboxes.length) {
      setAllCheckedOnPage(true);
    } else {
      setAllCheckedOnPage(false);
    }

    return () => {
      if (fileImportInput.current) {
        fileImportInput.current!.value! = "";
      }
    };
  }, [importLoading, checkedArray, deleteLoading, allCheckedOnPage]);

  function handleCheckBoxAll(e: any) {
    const checked = e.target.checked;
    if (checked) {
      tableProps?.dataSource?.map((el: any) => {
        if (checkboxRefs?.current[el.id]) {
          setCheckedArray((s) => {
            return [...s, el.id];
          });
        }
      });
      setAllCheckedOnPage(true);
    } else {
      setCheckedArray([]);
      setAllCheckedOnPage(false);
    }
  }

  function handleCheckBox(e: any, id: any) {
    //@ts-ignore
    setPageCheckboxes(document.querySelectorAll(".ant-table-row-checkbox"));
    const checked = e.target.checked;
    if (checked) {
      setCheckedArray((s) => {
        return [...s, id];
      });
      setVisibleCheckAll(true);
    } else {
      const checkedArrayCopy = [...checkedArray];
      checkedArrayCopy.filter((el, index) => {
        if (el === id) {
          checkedArrayCopy.splice(index, 1);
        }
      });
      setCheckedArray(checkedArrayCopy);
    }
  }

  const confirmDelete = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Êtes vous sur de vouloir supprimer les élements sélèctionnés ?",
      okText: "Supprimer",
      cancelText: "Annuler",
      async onOk(...args) {
        if (checkedArray.length) {
          const results = checkedArray.map(async (ob) => {
            return axiosInstance.delete(apiUrl + `/opportunities/${ob}`, {
              headers: {
                "Content-Type": "application/json",
              },
            });
          });

          await Promise.all(results);
          // console.log(results);
          invalidate({
            resource: "opportunities",
            invalidates: ["list"],
          });
          setCheckedArray([]);
        }
      },
    });
  };

  return (
    <>
      {contextHolder}
      {modalContextHolder}
      <List
        headerProps={{
          extra: (
            <AdminOrContributor>
              <Space>
                {checkedArray.length ? (
                  <button
                    className="btn-primary"
                    onClick={confirmDelete}
                    style={{ backgroundColor: "#ff4d4f", color: "white" }}
                  >
                    {`${checkedArray.length}`} Effacer Selection
                  </button>
                ) : null}
                <Input
                  type="file"
                  ref={fileImportInput}
                  onChange={handleImport}
                />
                <button
                  className="btn-primary"
                  onClick={() => {
                    // log datas
                    if (tableProps?.dataSource) {
                      const data = tableProps?.dataSource.map((el: any) => {
                        return {
                          title: el.title,
                          beginning_date: el.beginning_date,
                          ending_date: el.ending_date,
                          target_country: el.target_country,
                          description: el.description,
                          eligibility: el.eligibility,
                          processus: el.processus,
                          beneficies: el.beneficies,
                          registration_link: el.registration_link,
                          isRecurrent: el.isRecurrent,
                          frequency: el.frequency,
                        };
                      });
                      if (data) {
                        const csv = papa.unparse(data);
                        const blob = new Blob([csv], { type: "text/csv" });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.setAttribute("hidden", "");
                        a.setAttribute("href", url);
                        a.setAttribute(
                          "download",
                          `opportunities-${new Date()}-${Math.round(
                            Math.random() * 99999999
                          )}.csv`
                        );
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }
                    }
                  }}
                >
                  Exporter les données
                </button>
                <CreateButton
                  className="btn-primary"
                  style={{
                    backgroundColor: "#6cd9cb",
                  }}
                />
              </Space>
            </AdminOrContributor>
          ),
        }}
      >
        <Table {...tableProps} rowKey="id" scroll={{ x: 2500, y: "auto" }}>
          <Table.Column
            fixed="left"
            width={68}
            dataIndex=""
            title={
              visibleCheckAll ? (
                <Checkbox
                  checked={allCheckedOnPage}
                  defaultChecked={false}
                  onChange={handleCheckBoxAll}
                />
              ) : (
                "#"
              )
            }
            render={(_, record: BaseRecord) => {
              return (
                <Checkbox
                  key={record.id}
                  checked={checkedArray.includes(record.id)}
                  ref={(input) => (checkboxRefs.current[record.id] = record.id)}
                  className="ant-table-row-checkbox"
                  onChange={() => handleCheckBox(event, record.id)}
                />
              );
            }}
          />
          <Table.Column dataIndex="title" title="Titre" ellipsis={true} />
          <Table.Column
            dataIndex={["opportunity_type", "name"]}
            title="Type d'opportunité"
          />
          <Table.Column
            dataIndex={["beginning_date"]}
            title="Date de début"
            render={(value: any) => {
              if (value) {
                return <DateField value={value} />;
              } else {
                return "-";
              }
            }}
          />
          <Table.Column
            dataIndex={["ending_date"]}
            title="Date de fin"
            render={(value: any) => {
              if (value) {
                return <DateField value={value} />;
              } else {
                return "-";
              }
            }}
          />
          <Table.Column
            dataIndex={["isRecurrent"]}
            title="Est Récurrent"
            render={(value: any) => {
              if (value) {
                return <BooleanField value={value} />;
              } else {
                return "-";
              }
            }}
          />
          <Table.Column dataIndex="frequency" title="Fréquence" />
          <Table.Column
            dataIndex={["user", "complete_name"]}
            title="Contributeur"
          />
          <Table.Column
            ellipsis={true}
            dataIndex="registration_link"
            render={(value: any) => {
              if (value) {
                return (
                  <Link href={value} target="_blank">
                    {value}
                  </Link>
                );
              } else {
                return "-";
              }
            }}
            title="Lien d'inscription"
          />
          <Table.Column
            dataIndex="contacts"
            title="Référents"
            render={(value: any[]) =>
              contactsIsLoading ? (
                <>Loading ...</>
              ) : (
                <>
                  {value?.map((item, index) => (
                    <TagField key={index} value={item?.complete_name} />
                  ))}
                </>
              )
            }
          />
          <Table.Column
            dataIndex="organisations"
            title="Organisations"
            render={(value: any[]) =>
              organisationsIsLoading ? (
                <>Loading ...</>
              ) : (
                <>
                  {value?.map((item, index) => (
                    <TagField key={index} value={item?.name} />
                  ))}
                </>
              )
            }
          />
          <Table.Column
            dataIndex="targets"
            title="Acteurs Cibles"
            render={(value: any[]) =>
              targetsIsLoading ? (
                <>Loading ...</>
              ) : (
                <>
                  {value?.map((item, index) => (
                    <TagField key={index} value={item?.name} />
                  ))}
                </>
              )
            }
          />
          {/* <Table.Column dataIndex="target_people" title="Cible" /> */}

          <Table.Column
            dataIndex="target_countries"
            title="Pays cibles"
            render={(value: any[]) =>
              targetCountriesIsLoading ? (
                <>Loading ...</>
              ) : (
                <>
                  {value?.map((item, index) => (
                    <TagField
                      key={index}
                      value={item?.translations?.fra?.common}
                    />
                  ))}
                </>
              )
            }
          />
          <Table.Column
            dataIndex="activity_areas"
            title="Secteur d'activité"
            render={(value: any[]) =>
              activityAreasIsLoading ? (
                <>Loading ...</>
              ) : (
                <>
                  {value?.map((item, index) => (
                    <TagField key={index} value={item?.name} />
                  ))}
                </>
              )
            }
          />
          <Table.Column
            fixed="right"
            title="Actions"
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <AdminOrContributor>
                  <EditButton hideText size="small" recordItemId={record.id} />
                </AdminOrContributor>
                <ShowButton hideText size="small" recordItemId={record.id} />
                <Admin>
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                  />
                </Admin>
              </Space>
            )}
          />
        </Table>
        <AdminOrContributor>
          <Space>
            {checkedArray.length ? (
              <button
                className="btn-primary"
                onClick={confirmDelete}
                style={{ backgroundColor: "#ff4d4f", color: "white" }}
              >
                {`${checkedArray.length}`} Effacer Selection
              </button>
            ) : null}
          </Space>
        </AdminOrContributor>
      </List>
    </>
  );
};
