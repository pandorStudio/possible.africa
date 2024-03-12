import React, { useEffect, useRef, useState } from "react";
import {
  BaseRecord,
  IResourceComponentsProps,
  useApiUrl,
  useInvalidate,
} from "@refinedev/core";
import {
  CreateButton,
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Button, Checkbox, Input, message, Modal, Space, Table } from "antd";
import papa from "papaparse";
import { axiosInstance } from "../../custom-data-provider/data-provider";
import Link from "antd/es/typography/Link";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Admin,
  AdminOrContributor,
} from "../../custom-components/AccessControl";

export const JobList: React.FC<IResourceComponentsProps> = () => {
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
              description: el[1],
              type: el[2],
              salary: el[3],
              beginning_date: el[4],
              ending_date: el[5],
              location: el[6],
              skills: el[7],
            };
            body.push({ ...ob });
            // await axios.post(apiUrl + "/organisations", el);
            setImportLoading(true);
            await axiosInstance
              .post(
                apiUrl + "/jobs",
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
        duration: 10000000,
      });
    }
    if (!importLoading) {
      messageApi.destroy();
      invalidate({
        resource: "jobs",
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
            return axiosInstance.delete(apiUrl + `/jobs/${ob}`, {
              headers: {
                "Content-Type": "application/json",
              },
            });
          });

          await Promise.all(results);
          // console.log(results);
          invalidate({
            resource: "jobs",
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
                          description: el.description,
                          type: el.type,
                          salary: el.salary,
                          beginning_date: el.beginning_date,
                          ending_date: el.ending_date,
                          location: el.location,
                          skills: el.skills,
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
                          `jobs-${new Date().toString()}-${Math.round(
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
        {modalContextHolder}
        <Table
          {...tableProps}
          style={{
            width: "1800px !important",
            overflowX: "scroll",
          }}
          scroll={{ x: 1800, y: "auto" }}
          rowKey="id"
        >
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
          <Table.Column
            dataIndex={["organisation", "name"]}
            title="Organisation"
          />
          <Table.Column dataIndex="title" title="Titre" />
          {/* <Table.Column
            dataIndex="description"
            title="Description"
            render={(value: any) => {
              if (value && value.length > 100) {
                return value.substring(0, 100) + "...";
              } else if (value) {
                return value;
              } else {
                return "-";
              }
            }}
          /> */}
          <Table.Column dataIndex="type" title="Type" />

          <Table.Column
            dataIndex="source"
            title="Source"
            ellipsis
            render={(value: any) => {
              if (value) {
                return <Link href={value}>{value}</Link>;
              } else {
                return "-";
              }
            }}
          />
          <Table.Column dataIndex="salary" title="Salaire" />
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
            dataIndex="location"
            title="Emplacement"
            render={(value: any) => {
              if (value) {
                return (
                  <Link
                    // href={"https://www.google.com/search?q=" + value}
                    href={"https://www.google.com/maps/search/" + value}
                    target="_blank"
                  >
                    {value}
                  </Link>
                );
              } else {
                return "-";
              }
            }}
            ellipsis={true}
          />
          <Table.Column
            dataIndex="skills"
            title="Compétences"
            ellipsis={true}
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
