import React from 'react';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { Pagination, BaseTableProps, Sin } from './table.type';
import style from './index.module.scss';
import SearchForm from './SearchForm/index';

export const STable = (props: BaseTableProps<any>) => {
  const { columns, onChange } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [sorceData, setSorceData] = useState<[]>([]);
  const [query, setQuery] = useState<Sin>({});
  const [page, setPage] = useState<Pagination>({
    total: 0,
    pageSize: 10,
    current: 1,
  });

  const getData = async (init?: boolean): Promise<void> => {
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

  const pageChange = (pagination: Pagination, query: Sin) => {
    setPage({ ...pagination });
    onChange && onChange(page, query);
  };

  const queryMaker = (query: Sin) => {
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
