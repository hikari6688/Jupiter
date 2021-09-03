import React from 'react';
import SItem from './FormItem';
import { Form, Input, Button, Select, Space } from 'antd';
type SearchType = 'input' | 'select' | 'tree' | 'date';
//支持文本 、下拉、 树、时间选择器
interface propType {
  columns: any;
  queryMaker: (query) => void;
  getData: (init?: boolean) => Promise<void>;
}
const SearchForm = (props: propType) => {
  const { columns, queryMaker, getData } = props;
  const search = columns.filter((item) => {
    return item.search;
  });
  const [form] = Form.useForm();
  const submit = (): void => {
    //搜索
    queryMaker(form.getFieldsValue());
    getData(true);
  };
  const reset = (): void => {
    //重置搜索条件并搜索
    form.resetFields();
    queryMaker(null); //重置搜索条件
    getData(true); //搜索
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <Form {...layout} layout="inline" form={form}>
      {search.map((item) => {
        return (
          <Form.Item
            name={item.dataIndex}
            label={item.title}
            key={item.dataIndex}
          >
            <SItem conf={item.search}/>
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
