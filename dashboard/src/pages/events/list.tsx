import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  TagField,
  DateField,
  BooleanField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const EventList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: usersData, isLoading: usersIsLoading } = useMany({
    resource: "users",
    ids: tableProps?.dataSource?.map((item) => item?.user?.id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex={["organisation", "name"]}
          title="Organisation"
        />
        <Table.Column
          dataIndex="users"
          title="Users"
          render={(value: any[]) =>
            usersIsLoading ? (
              <>Loading...</>
            ) : (
              <>
                {value?.map((item, index) => (
                  <TagField
                    key={index}
                    value={
                      usersData?.data?.find(
                        (resourceItems) => resourceItems.id === item?.username
                      )?.username
                    }
                  />
                ))}
              </>
            )
          }
        />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex={["beginningDate"]}
          title="Beginning Date"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["endingDate"]}
          title="Ending Date"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column dataIndex={["event_type", "name"]} title="Event Type" />
        <Table.Column dataIndex="format" title="Format" />
        <Table.Column dataIndex="target_countriy" title="Target Countriy" />
        <Table.Column dataIndex="activity_area" title="Activity Area" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column dataIndex="registration_link" title="Registration Link" />
        <Table.Column
          dataIndex={["is_recurrent"]}
          title="Is Recurrent"
          render={(value: any) => <BooleanField value={value} />}
        />
        <Table.Column dataIndex="frequence" title="Frequence" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
