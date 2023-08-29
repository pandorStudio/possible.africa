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
  ImageField,
  List,
  ShowButton,
  TagField,
  useEditableTable,
  useTable,
} from "@refinedev/antd";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Modal,
  Space,
  Table,
} from "antd";
import papa from "papaparse";
import { downloadMedia } from "../organisations/list";
import { imageUploadHandler } from "../posts/create";
import Link from "antd/es/typography/Link";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Admin,
  AdminOrContributor,
} from "../../custom-components/AccessControl";
import { TOKEN_KEY } from "../../custom-data-provider/data-provider";
import { useCreate } from "@refinedev/core";
import axios from "axios";

// interface IEvent {
//   title: string;
//   type: {
//     id: string;
//   };

// }

export const EventList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, formProps } = useEditableTable({
    syncWithLocation: true,
  });
  const { data: countriesData, isLoading: countriesIsLoading } = useMany({
    resource: "countries",
    ids: tableProps?.dataSource?.map((item) => item?.target_countries) ?? [],
  });
  const { data: organisationsData, isLoading: organisationsIsLoading } =
    useMany({
      resource: "organisations",
      ids: tableProps?.dataSource?.map((item) => item?.organisations) ?? [],
    });
  const { data: contactsData, isLoading: contactsIsLoading } = useMany({
    resource: "users",
    ids: tableProps?.dataSource?.map((item) => item?.contacts) ?? [],
  });
  const { data: activityAreasData, isLoading: activityAreasIsLoading } =
    useMany({
      resource: "activity_areas",
      ids: tableProps?.dataSource?.map((item) => item?.activity_areas) ?? [],
    });

  const [importLoading, setImportLoading] = useState(false);
  const fileImportInput = useRef(null);
  const apiUrl = useApiUrl();
  const [checkedArray, setCheckedArray] = useState([]);
  const [allCheckedOnPage, setAllCheckedOnPage] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modal, modalContextHolder] = Modal.useModal();
  const [pageCheckboxes, setPageCheckboxes] = useState([]);
  const [visibleCheckAll, setVisibleCheckAll] = useState(false);
  const invalidate = useInvalidate();
  let checkboxRefs = useRef([]);
  const { mutate } = useCreate();
  const token = localStorage.getItem(TOKEN_KEY);
  const axiosInstance = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

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
            let promisesToBeResolved = [];
            let eventType = null;
            if (el[0] || el[9] || el[7] || el[3] || el[13] || el[15]) {
              // const blobImage = await downloadMedia(el[7]);
              // const imageUrl = await imageUploadHandler(blobImage.data.dataUrl);
              // try to get the event type
              eventType = await axiosInstance.get(
                apiUrl + `/event_types?name=${el[9]}`
              );
              // console.log(eventType, "event type");
              if (!eventType?.data?.length) {
                // create the event type
                const result = await axiosInstance.post(
                  apiUrl + "/event_types",
                  {
                    name: el[9],
                  }
                );
                eventType = result?.data?.id;
              } else {
                eventType = eventType?.data[0]?.id;
              }

              let countriesArray = [];

              const array = [];
              const countriesToBeImported = el[3].split(";");
              // console.log(countriesToBeImported, "To be imported");
              countriesArray = await countriesToBeImported.map((item: any) => {
                return axiosInstance
                  .get(apiUrl + `/countries?translations.fra.common=${item}`)
                  .then((result) => {
                    // console.log(result);
                    return result?.data[0]?.id;
                  });
                // return result?.data[0].id;
              });

              let activityAreas = [];
              activityAreas = el[10].split(";").map(async (item) => {
                const result = await axiosInstance.get(
                  apiUrl + `/activity_areas?name=${item}`
                );
                // console.log(result, "activity area");
                if (!result?.data?.length) {
                  // create the activity area
                  const result = await axiosInstance.post(
                    apiUrl + "/activity_areas",
                    {
                      name: item,
                    }
                  );
                  return result?.data?.id;
                } else {
                  return result?.data[0]?.id;
                }
              });
              // console.log(activityAreas, "activity areas");

              let contacts = [];
              // try to get the contacts
              contacts = el[13].split(";").map(async (item) => {
                const result = await axiosInstance.get(
                  apiUrl + `/users?email=${item}`
                );
                // console.log(result, "contacts");
                if (!result?.data?.length) {
                  // create the contact
                  const result = await axiosInstance.post(apiUrl + "/users", {
                    email: item,
                    firstname: item.split("@")[0],
                    role: "contact",
                  });
                  return result?.data?.id;
                } else {
                  return result?.data[0]?.id;
                }
              });

              let organisations = [];

              // try to get the organisations
              organisations = el[15].split(";").map(async (item) => {
                const result = await axiosInstance.get(
                  apiUrl + `/organisations?name=${item}`
                );
                // console.log(result, "organisations");
                if (!result?.data?.length) {
                  // create the organisation
                  const result = await axiosInstance.post(
                    apiUrl + "/organisations",
                    {
                      name: item,
                    }
                  );
                  return result?.data?.id;
                } else {
                  return result?.data[0]?.id;
                }
              });

              Promise.all(countriesArray).then((values) => {
                countriesArray = values;
                Promise.all(activityAreas).then((values) => {
                  activityAreas = values;
                  Promise.all(contacts).then((values) => {
                    contacts = values;
                    Promise.all(organisations).then((values) => {
                      organisations = values;

                      const ob: any = {
                        title: el[0],
                        beginningDate: el[1],
                        endingDate: el[2],
                        target_countries: countriesArray,
                        description: el[4],
                        registration_link: el[5],
                        location: el[6],
                        // cover: imageUrl ? imageUrl : "",
                        format: el[8],
                        event_type: eventType,
                        activity_areas: activityAreas,
                        is_recurrent: el[11] === "Oui" ? true : false,
                        frequence: el[12],
                        contacts,
                        source: el[14],
                        organisations,
                      };
                      body.push({ ...ob });
                      // await axios.post(apiUrl + "/organisations", el);
                      axiosInstance
                        .post(
                          apiUrl + "/events",
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
                          // console.log(error);
                        });
                    });
                  });
                });
              });
            }
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
        resource: "events",
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
            return axiosInstance.delete(apiUrl + `/events/${ob}`, {
              headers: {
                "Content-Type": "application/json",
              },
            });
          });

          await Promise.all(results);
          // console.log(results);
          invalidate({
            resource: "events",
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
                  <Button
                    onClick={confirmDelete}
                    style={{ backgroundColor: "#ff4d4f", color: "white" }}
                  >
                    {`${checkedArray.length}`} Effacer Selection
                  </Button>
                ) : null}
                <Input
                  type="file"
                  ref={fileImportInput}
                  onChange={handleImport}
                />
                <Button
                  type="primary"
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
                          registration_link: el.registration_link,
                          location: el.location,
                          cover: el.cover,
                          format: el.format,
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
                          `events-${new Date()}-${Math.round(
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
                </Button>
                <CreateButton />
              </Space>
            </AdminOrContributor>
          ),
        }}
      >
        {modalContextHolder}
        <Form {...formProps}>
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
                    ref={(input) =>
                      (checkboxRefs.current[record.id] = record.id)
                    }
                    className="ant-table-row-checkbox"
                    onChange={() => handleCheckBox(event, record.id)}
                  />
                );
              }}
            />
            <Table.Column dataIndex="title" title="Titre" ellipsis={true} />

            <Table.Column
              dataIndex={["event_type", "name"]}
              title="Type d'évenement"
            />
            <Table.Column dataIndex="format" title="Format" />
            <Table.Column
              dataIndex={["beginningDate"]}
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
              dataIndex={["endingDate"]}
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
              dataIndex={["is_recurrent"]}
              title="Est Récurrent"
              render={(value: any) => {
                if (value) {
                  return <BooleanField value={value} />;
                } else {
                  return "-";
                }
              }}
            />
            <Table.Column dataIndex="frequence" title="Frequence" />
            <Table.Column
              dataIndex={["user", "complete_name"]}
              title="Contributeur"
            />
            <Table.Column
              ellipsis={true}
              dataIndex="location"
              title="Emplacement"
              render={(value: any) => {
                if (value) {
                  return (
                    <Link
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
            />
            <Table.Column
              ellipsis={true}
              dataIndex="registration_link"
              title="Lien d'inscription"
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
            />
            <Table.Column
              dataIndex="contacts"
              title="Contacts"
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
              dataIndex="target_countries"
              title="Pays Cible"
              render={(value: any[]) =>
                countriesIsLoading ? (
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
              dataIndex={["activity_areas"]}
              title="Secteur d'activité"
              render={(value: any[]) =>
                activityAreasIsLoading ? (
                  <>Chargement...</>
                ) : (
                  <>
                    {value?.map((item, index) => (
                      <TagField key={index} value={item?.name} />
                    ))}
                  </>
                )
              }
            />
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

            <Table.Column
              fixed="right"
              title="Actions"
              dataIndex="actions"
              render={(_, record: BaseRecord) => (
                <Space>
                  <AdminOrContributor>
                    <EditButton
                      hideText
                      size="small"
                      recordItemId={record.id}
                    />
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
        </Form>

        <AdminOrContributor>
          <Space>
            {checkedArray.length ? (
              <Button
                onClick={confirmDelete}
                style={{ backgroundColor: "#ff4d4f", color: "white" }}
              >
                {`${checkedArray.length}`} Effacer Selection
              </Button>
            ) : null}
          </Space>
        </AdminOrContributor>
      </List>
    </>
  );
};
