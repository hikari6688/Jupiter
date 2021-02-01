import React from 'react';
import { Table, Tag, Space } from 'antd';
import { TableProps } from 'antd/lib/table';
import { useEffect, useState } from 'react';

let loading = false;
interface ResType {
  code?: number;
  data?: {
    current?: number;
    total?: number;
    result?: [{}];
  };
}

interface BaseTableProps<T> extends TableProps<T> {
  data: () => Promise<T>; //数据源
  onChange: (pagination) => void;
}

interface Pagination {
  total: number;
  pageSize: number;
  current: number;
}

export const STable = (props: BaseTableProps<ResType>) => {
  const [sorceData, setSorceData] = useState([]);
  const [page, setPage] = useState({
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const getData = async () => {
    loading = true;
    const res = await props.data();
    loading = false;
    const d = res.data;
    setPage({ ...page, total: d.total });
    setSorceData(d.result);
  };

  useEffect(() => {
    //分页数据变化=>重新请求数据
    getData();
  }, [page.current]);

  const pageChange = (pagination) => {
    setPage({ ...pagination });
    props.onChange(page);
  };

  return (
    <Table
      {...props}
      size="small"
      loading={loading}
      dataSource={sorceData}
      pagination={page}
      onChange={pageChange}
    />
  );
};
