import React, { useRef } from 'react';
import { Table } from 'antd';
import { useEffect, useState, useReducer } from 'react';
import { Pagination, BaseTableProps, TSearchObject } from './table.type';
import { useModal } from '../../hooks';
import style from './index.module.scss';
import SearchForm from './SearchForm/index';

export const STable = (props: BaseTableProps<any>) => {
  const { columns, data, ...rest } = props;
  const [loading, setLoading] = useState<boolean>(false); //表格加载动画
  const [tableData, setTableData] = useState<[]>([]); //表格数据源
  const [params, setParams] = useState<TSearchObject>({}); //搜索参数
  const ovCol = useRef([]);
  const [page, setPage] = useState<Pagination>({
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const { setShow, CustomModal } = useModal('新增');
  const getTableData = async (): Promise<void> => {
    setLoading(true);
    try {
      const { _reset, ...restArgs } = params;
      if (_reset) {
        setPage({ ...page, current: 1 });
        setParams({ _reset: false });
      }
      const { total, result } = await data(page, restArgs);
      setPage({ ...page, total });
      setTableData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //分页参数变化时重新请求表格数据
    getTableData();
  }, [page.current, page.pageSize, params]);

  useEffect(() => {
    const overWriteColumn = [
      ...props.columns,
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <>
            <a onClick={ ()=>{ setShow(true) } }>Delete</a>
          </>
        ),
      },
    ];
    ovCol.current = overWriteColumn;
  }, []);

  const onOk = () => {};
  
  return (
    <div className={style.table_wrap}>
      <div className={style.search}>
        <SearchForm columns={columns} setParams={setParams} />
      </div>
      <div className={style.stage}>
        <Table
          rowKey="id"
          bordered
          size="small"
          loading={loading}
          dataSource={tableData}
          pagination={page}
          onChange={(pagination: Pagination) => {
            setPage({ ...pagination });
          }}
          columns={ovCol.current}
          {...rest}
        />
      </div>
      <CustomModal onOk={onOk}  />
    </div>
  );
};
