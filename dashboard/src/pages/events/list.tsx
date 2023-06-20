import React, { useEffect, useRef, useState } from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useApiUrl,
  useInvalidate,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  BooleanField,
  DeleteButton,
  CreateButton,
  ExportButton,
  ImageField,
} from "@refinedev/antd";
import { Table, Space, Input, message } from "antd";
import { axiosInstance } from "@refinedev/simple-rest";
import papa from "papaparse";
import { downloadMedia } from "../organisations/list";
import { imageUploadHandler } from "../posts/create";
import Link from "antd/es/typography/Link";

export const EventList: React.FC<IResourceComponentsProps> = () => {
  const [importLoading, setImportLoading] = useState(false);
  const fileImportInput = useRef(null);
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
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
            const blobImage = await downloadMedia(el[16]);
            const imageUrl = await imageUploadHandler(blobImage.data.dataUrl);
            const ob: any = {
              title: el[1],
              beginning_date: el[11],
              ending_date: el[12],
              target_country: el[10],
              description: el[8],
              registration_link: el[15],
              location: el[10],
              cover: imageUrl ? imageUrl : "",
              format: el[7],
            };
            body.push({ ...ob });
            // await axios.post(apiUrl + "/organisations", el);
            await axiosInstance
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
        resource: "events",
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
        <Table {...tableProps} rowKey="id" scroll={{ x: 2500, y: "auto" }}>
          <Table.Column dataIndex="title" title="Titre" ellipsis={true} />
          <Table.Column
            width={120}
            dataIndex={["cover"]}
            title="Couverture"
            render={(value: any) => {
              if (value && !(value.split(".").pop() === "html")) {
                return (
                  <ImageField style={{ maxWidth: "50px" }} value={value} />
                );
              } else {
                return "-";
              }
            }}
          />
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
            dataIndex={["organisation", "name"]}
            title="Organisation"
          />
          <Table.Column
            dataIndex={["event_type", "name"]}
            title="Type d'évenement"
          />
          <Table.Column dataIndex="format" title="Format" />
          <Table.Column dataIndex="target_countriy" title="Pays Cible" />
          <Table.Column dataIndex="activity_area" title="Secteur d'activité" />
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
          <Table.Column dataIndex={["user", "username"]} title="Contributeur" />
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
