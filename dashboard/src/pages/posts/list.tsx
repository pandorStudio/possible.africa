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
import { Table, Space, message, Input } from "antd";
import papa from "papaparse";
import { axiosInstance } from "../../authProvider";
import { downloadMedia } from "../organisations/list";
import { imageUploadHandler } from "./create";

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
  const invalidate = useInvalidate();

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
        duration: 0,
      });
    }
    if (!importLoading) {
      messageApi.destroy();
      invalidate({
        resource: "posts",
        invalidates: ["list"],
      });
    }

    return () => {
      if (fileImportInput.current) {
        fileImportInput.current!.value! = "";
      }
    };
  }, [importLoading]);

  return (
    <>
      {contextHolder}
      <List
        headerProps={{
          extra: (
            <Space>
              <Input
                type="file"
                ref={fileImportInput}
                onChange={handleImport}
              />
              <ExportButton />
              <CreateButton />
            </Space>
          ),
        }}
      >
        <Table {...tableProps} rowKey="_id" scroll={{ x: 1800, y: "auto" }}>
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
      </List>
    </>
  );
};
