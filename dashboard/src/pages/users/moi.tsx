import React, { useEffect } from "react";
import {
    IResourceComponentsProps,
    BaseRecord,
    useTranslate,
    useShow,
} from "@refinedev/core";
import { useTable, List, Show } from "@refinedev/antd";
import { Table, Space } from "antd";

export const MoiList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    
    const record = data?.data;

    useEffect(() => {
        console.log(record);
    }, [record]);

    return (
        <Show>
        </Show>
    );
};
