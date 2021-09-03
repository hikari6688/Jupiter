import React from 'react';
import { Table, Form, Input, Button, Select } from 'antd';
import { TableProps, ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import style from './index.module.scss';
import SearchForm from './SearchForm/index';
interface Pagination {
  total: number;
  pageSize: number;
  current: number;
}

interface BaseTableProps<T> extends TableProps<T> {
  data: (pagination, query) => Promise<T>; //数据源
  onChange?: (pagination: Pagination, query) => void;
  searchBtn?: boolean;
  resetBtn?: boolean;
}

export const STable = (props: BaseTableProps<any>) => {
  const { columns } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [sorceData, setSorceData] = useState<[]>([]);
  const [query, setQuery] = useState({});
  const [page, setPage] = useState({
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const getData = async (init?: boolean) => {
    setLoading(true);
    try {
      init && setPage({ ...page, current: 1 });
      const { total, result } = await props.data(page, query);
      setPage({ ...page, total });
      setSorceData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page.current, page.pageSize]);

  const pageChange = (pagination: Pagination, query) => {
    setPage({ ...pagination });
    props.onChange && props.onChange(page, query);
  };

  const queryMaker = (query) => {
    query && setQuery(query);
  };

  return (
    <div className={style.table_wrap}>
      <div className={style.search}>
        <SearchForm
          columns={columns}
          getData={getData}
          queryMaker={queryMaker}
        />
      </div>
      <div className={style.stage}>
        <Table
          rowKey="id"
          bordered
          size="small"
          loading={loading}
          dataSource={sorceData}
          pagination={page}
          onChange={pageChange}
          {...props}
        />
      </div>
    </div>
  );
};
