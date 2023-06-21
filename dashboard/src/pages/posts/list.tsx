import React, { useEffect, useRef, useState } from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useMany,
  useApiUrl,
  useInvalidate,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  ImageField,
  DeleteButton,
  TagField,
  ExportButton,
  CreateButton,
} from "@refinedev/antd";
import { Table, Space, message, Input, Modal, Button, Checkbox } from "antd";
import papa from "papaparse";
import { axiosInstance } from "../../authProvider";
import { downloadMedia } from "../organisations/list";
import { imageUploadHandler } from "./create";
import { ExclamationCircleOutlined } from "@ant-design/icons";

async function processContent(content: string) {
  let imgTags = content.match(/<img[^>]+src="([^">]+)"/g);
  if (imgTags && imgTags.length > 0) {
    let imgs = imgTags.map((imgTag) => {
      const imgUrl = imgTag
        .match(/src="([^">]+)"/g)[0]
        .replace('src="', "")
        .replace('"', "");

      return imgUrl;
    });
    let contentProcessed = "";
    const result = imgs.map(async (img) => {
      const imgBase64 = await downloadMedia(img);
      const imgUrlS3 = await imageUploadHandler(imgBase64.data.dataUrl);
      // console.log(img.url);
      contentProcessed = content.replace(`${img}`, `${imgUrlS3}`);
      return contentProcessed;
    });

    const finalContent = await Promise.all(result).then((values: string[]) => {
      //return the last element of values array
      contentProcessed = values[values.length - 1];
      return contentProcessed;
    });
    return finalContent;
  }
}

export const PostList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: organisationsData, isLoading: organisationsIsLoading } =
    useMany({
      resource: "organisations",
      ids: tableProps?.dataSource?.map((item) => item?.organisations) ?? [],
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
            const content = await processContent(el[3]);
            const imageBase64 = await downloadMedia(el[9]);
            const image = await imageUploadHandler(imageBase64.data.dataUrl);
            console.log(image);
            const ob: any = {
              title: el[1],
              content: el[3],
              categorie:
                el[4] === "Portraits"
                  ? "6474bac3de440360d8a0a917"
                  : "6474bad3de440360d8a0a91b",
              country: el[10],
              slug: el[2],
              image: image ? image : "",
            };
            body.push({ ...ob });
            // await axios.post(apiUrl + "/organisations", el);
            await axiosInstance
              .post(
                apiUrl + "/posts",
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
                console.log(response);
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
        resource: "organisations",
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
            return axiosInstance.delete(apiUrl + `/posts/${ob}`, {
              headers: {
                "Content-Type": "application/json",
              },
            });
          });

          await Promise.all(results);
          console.log(results);
          invalidate({
            resource: "posts",
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
                        content: el.content,
                        country: el.country,
                        slug: el.slug,
                        image: el.image,
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
                        `articles-${new Date()}-${Math.round(
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
          ),
        }}
      >
        <Table {...tableProps} rowKey="_id" scroll={{ x: 1800, y: "auto" }}>
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
          <Table.Column dataIndex={["user", "username"]} title="Auteur" />
          <Table.Column
            dataIndex="organisations"
            title="Organisations"
            render={(value: any[]) =>
              organisationsIsLoading ? (
                <>Loading ...</>
              ) : (
                <>
                  {value?.map((item, index) => (
                    <TagField
                      key={index}
                      value={
                        organisationsData?.data?.find(
                          (resourcesItems) => resourcesItems._id === item?._id
                        )?.name
                      }
                    />
                  ))}
                </>
              )
            }
          />
          <Table.Column dataIndex="title" title="Titre" ellipsis={true} />
          <Table.Column dataIndex="country" title="Pays" />
          <Table.Column dataIndex="slug" title="Slug" ellipsis={true} />
          <Table.Column
            width={120}
            dataIndex={["image"]}
            title="Couverture"
            render={(value: any) => {
              if (value) {
                return <ImageField value={value} />;
              } else {
                return "-";
              }
            }}
          />
          <Table.Column dataIndex={["categorie", "name"]} title="Categorie" />
          <Table.Column
            fixed="right"
            title="Actions"
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>

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
      </List>
    </>
  );
};
