import React, { useEffect, useRef, useState } from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useExport,
  useImport,
  useCreate,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  TagField,
  EmailField,
  ImportButton,
  ExportButton,
  CreateButton,
  DeleteButton,
  RefreshButton,
} from "@refinedev/antd";
import { Table, Space, Button, Input } from "antd";
import { IOrganisation, IPost, IPostFile } from "../../interfaces";
import papa from "papaparse";
import { dataProvider } from "../../custom-data-provider/data-provider";
import axios from "axios";
import { axiosInstance } from "../../authProvider";
export const OrganisationList: React.FC<IResourceComponentsProps> = () => {
  const [importLoading, setImportLoading] = useState(false);
  const fileImportInput = useRef<HTMLInputElement>(null);
  const { tableProps } = useTable({
    syncWithLocation: true,
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
              name: el[0],
              type: "645534cee152aea2d0ad2296",
              contributeur: "645535e833d097b57f68af31",
              owner: 0,
              description: el[1],
              email: el[2],
              telephone: el[3],
              site_web: el[4],
              linkedin_url: el[5],
              facebook_url: el[6],
              twitter_url: el[7],
              adresse: el[8],
            };
            body.push({ ...ob });
            //await axios.post("http://localhost:5000/organisations", el);
            setImportLoading(true);
            await axiosInstance
              .post(
                "https://backend-possible-africa.onrender.com/organisations",
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
    console.log(body);
    let results = body.forEach(async (el) => {
      console.log(el);
      //await axios.put("http://localhost:5000", el);
    });

    console.log(results);
  }

  useEffect(() => {
    return () => {
      if (fileImportInput.current) {
        fileImportInput.current!.value! = "";
      }
    };
  }, [importLoading]);

  return (
    <List
      headerProps={{
        extra: (
          <Space>
            <Input type="file" onChange={handleImport} />
            <ExportButton />
            <CreateButton />
          </Space>
        ),
      }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Nom" />
        <Table.Column dataIndex={["type", "name"]} title="Type" />
        <Table.Column
          dataIndex={["contributeur", "username"]}
          title="Contributeur"
        />
        <Table.Column
          dataIndex={"owner"}
          title="Propriétaire"
          render={(value) => (value ? "Oui" : "Non")}
        />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          dataIndex={["email"]}
          title="Email"
          render={(value: any) => <EmailField value={value} />}
        />
        <Table.Column dataIndex="telephone" title="Telephone" />
        <Table.Column dataIndex="site_web" title="Site Web" />
        <Table.Column dataIndex="linkedin_url" title="Url Linkedin " />
        <Table.Column dataIndex="facebook_url" title="Url Facebook" />
        <Table.Column dataIndex="twitter_url" title="Url Twitter" />
        <Table.Column dataIndex="adresse" title="Adresse" />
        <Table.Column
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
  );
};
