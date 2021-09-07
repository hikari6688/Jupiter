import React from 'react';
import SItem from './FormItem';
import { Form, Button, Space } from 'antd';
import { Sin, IColumn, Column } from '../table.type';

interface propType {
  columns: IColumn[];
  queryMaker: (query: Sin) => void;
  getData: (init?: boolean) => Promise<void>;
}

const SearchForm = (props: propType) => {
  const { columns, queryMaker, getData } = props;
  const [form] = Form.useForm();
  const search = columns.filter((item) => {
    return item.search;
  });

  const submit = (): void => {
    queryMaker(form.getFieldsValue());
    getData(true);
  };

  const reset = (): void => {
    form.resetFields();
    queryMaker(null);
    getData(true);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Form {...layout} layout="inline" form={form}>
      {(search as Column<any>[]).map((item) => {
        return (
          <Form.Item
            name={item.dataIndex}
            label={item.title}
            key={item.dataIndex as string}
          >
            <SItem conf={item.search} />
          </Form.Item>
        );
      })}
      <Space>
        <Button type="primary" onClick={submit}>
          搜索
        </Button>
        <Button htmlType="submit" onClick={reset}>
          重置
        </Button>
      </Space>
    </Form>
  );
};

export default SearchForm;
