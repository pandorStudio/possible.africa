import React, { useEffect, useRef, useState } from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useApiUrl,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  EmailField,
  ImageField,
  DeleteButton,
  CreateButton,
} from "@refinedev/antd";
import {
  Table,
  Space,
  Avatar,
  Checkbox,
  Button,
  Alert,
  Modal,
  message,
} from "antd";
import Link from "antd/es/typography/Link";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../authProvider";
import { useInvalidate } from "@refinedev/core";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  const [checkedArray, setCheckedArray] = useState([]);
  const [allCheckedOnPage, setAllCheckedOnPage] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const [pageCheckboxes, setPageCheckboxes] = useState([]);
  const [visibleCheckAll, setVisibleCheckAll] = useState(false);
  const invalidate = useInvalidate();
  let checkboxRefs = useRef([]);

  const apiUrl = useApiUrl();

  useEffect(() => {
    if (checkedArray.length >= pageCheckboxes.length) {
      setAllCheckedOnPage(true);
    } else {
      setAllCheckedOnPage(false);
    }
  }, [checkedArray, deleteLoading, allCheckedOnPage]);

  function handleCheckBoxAll(e: any) {
    //@ts-ignore
    setPageCheckboxes(document.querySelectorAll(".ant-table-row-checkbox"));
    console.log(pageCheckboxes);
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
            return axiosInstance.delete(apiUrl + `/users/${ob}`, {
              headers: {
                "Content-Type": "application/json",
              },
            });
          });

          await Promise.all(results);
          console.log(results);
          invalidate({
            resource: "users",
            invalidates: ["list"],
          });
          setCheckedArray([]);
        }
      },
    });
  };

  return (
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
            <CreateButton />
          </Space>
        ),
      }}
    >
      {contextHolder}
      <Table {...tableProps} rowKey="_id" scroll={{ x: 2500, y: "auto" }}>
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
          fixed="left"
          dataIndex="username"
          title="N. Utilisateur"
        />

        <Table.Column
          width={68}
          dataIndex="avatar"
          title="Profil"
          render={(value: any) => {
            if (value) {
              return <Avatar src={value} />;
            } else {
              return "-";
            }
          }}
        />
        <Table.Column
          width="6%"
          ellipsis={true}
          dataIndex={["email"]}
          title="Email"
          render={(value: any) => {
            if (value) {
              return <EmailField value={value} />;
            } else {
              return "-";
            }
          }}
        />
        <Table.Column dataIndex="firstname" title="Prénom.s" />
        <Table.Column dataIndex="lastname" title="N. Famille" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          dataIndex="role"
          title="Role"
          render={(value: any) => {
            if (value) {
              value === "admin"
                ? "Administrateur"
                : value === "user"
                ? "Utilisateur"
                : "Contributeur";
            } else {
              return "-";
            }
          }}
        />
        <Table.Column
          dataIndex="gender"
          title="Genre"
          render={(value: any) => {
            if (value) {
              value === "m" ? "Masculin" : value === "f" ? "Féminin" : "Autre";
            } else {
              return "-";
            }
          }}
        />
        <Table.Column dataIndex="phone" title="Tèl." />

        <Table.Column
          ellipsis={true}
          dataIndex="adresse"
          title="Adresse"
          render={(value: any) => {
            if (value) {
              return (
                <Link
                  href={"https://www.google.com/search?q=" + value}
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
          dataIndex="facebook_profile"
          title="Profile Fb."
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
          dataIndex="twitter_profile"
          title="Profile Tw."
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
          dataIndex="linkedin_profile"
          title="Profile Li."
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
  );
};
