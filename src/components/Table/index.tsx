import React from 'react';
import { Table, Form, Input, Button, Select } from 'antd';
import { TableProps } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import style from './index.module.scss';
interface ResType {
  current?: number;
  total?: number;
  result?: [];
}

interface Pagination {
  total: number;
  pageSize: number;
  current: number;
}

interface BaseTableProps<T> extends TableProps<T> {
  data: () => Promise<T>; //数据源
  onChange?: (pagination: Pagination) => void;
}

export const STable = (props: BaseTableProps<ResType>) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [sorceData, setSorceData] = useState<[]>([]);
  const [page, setPage] = useState({
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const getData = async () => {
    setLoading(true);
    try {
      const { total, result } = await props.data();
      setPage({ ...page, total });
      setSorceData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //分页数据变化=>重新请求数据
    getData();
  }, [page.current]);

  const pageChange = (pagination) => {
    setPage({ ...pagination });
    props.onChange && props.onChange(page);
  };

  return (
    <div className={style.table_wrap}>
      <div className={style.search}>
        {/* 设计成配置形式 支持文字输入 下拉 树形下拉 时间选择 预留插槽 */}
        <Form form={form} name="horizontal_login" layout="inline">
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">搜索</Button>
          </Form.Item>
          <Form.Item>
            <Button>重置</Button>
          </Form.Item>
        </Form>
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
