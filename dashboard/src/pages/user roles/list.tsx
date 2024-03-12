import React, { useEffect, useRef, useState } from "react";
import {
  BaseRecord,
  IResourceComponentsProps,
  useApiUrl,
  useInvalidate,
} from "@refinedev/core";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Button, Checkbox, Input, message, Modal, Space, Table } from "antd";
import papa from "papaparse";
import { axiosInstance } from "../../custom-data-provider/data-provider";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Admin } from "../../custom-components/AccessControl";

export const UserRoleList: React.FC<IResourceComponentsProps> = () => {
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
    setImportLoading(true);
    papa.parse(file, {
      complete: async function (results) {
        results.data.map(async (el: any, i) => {
          if (i === 0) {
            headers.push(...el);
          } else {
            const ob: any = {
              name: el[0],
              slug: el[1],
            };
            body.push({ ...ob });
            axiosInstance
              .post(
                apiUrl + "/user_roles",
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
        resource: "user_roles",
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
            return axiosInstance.delete(apiUrl + `/user_roles/${ob}`, {
              headers: {
                "Content-Type": "application/json",
              },
            });
          });

          await Promise.all(results);
          // console.log(results);
          invalidate({
            resource: "user_roles",
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
                        name: el.name,
                        slug: el.slug,
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
                        `user_roles-${new Date()}-${Math.round(
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
          ),
        }}
      >
        {contextHolder}
        <Table {...tableProps} rowKey="_id">
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
          <Table.Column dataIndex="name" title="Nom" />

          <Table.Column dataIndex="slug" title="Slug" />
          <Table.Column
            fixed="right"
            title="Actions"
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <Admin>
                  <ShowButton hideText size="small" recordItemId={record.id} />
                </Admin>
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
      </List>
    </>
  );
};
