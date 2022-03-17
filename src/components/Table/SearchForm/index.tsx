import React, { useEffect } from 'react';
import FormItem from './FormItem';
import { Form, Button, Space } from 'antd';
import { TSearchObject, IColumn, Column } from '../table.type';

interface ISearchForm {
  columns: IColumn[]; //表头和字段配置
  setParams: (query: TSearchObject) => void; //设置请求参数
  getTableData?: (init?: boolean) => Promise<void>; //获取table数据
}

const SearchForm = (props: ISearchForm) => {
  const { columns, setParams } = props;
  const [form] = Form.useForm();

  const searchCols = columns.filter((item) => {
    return item.type;
  });

  const submit = (): void => {
    const data = form.getFieldsValue();
    setParams(data);
  };

  const reset = (): void => {
    form.resetFields();
    setParams({ _reset: true });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Form {...layout} layout="inline" form={form} >
      {(searchCols as Column<IColumn>[]).map((columnProp) => {
        return (
          <Form.Item
            name={columnProp.dataIndex}
            label={columnProp.title}
            key={columnProp.dataIndex as string}
            style={{
              width: `${columnProp.searchWidth || 200}px`,
            }}
          >
            <FormItem {...columnProp} />
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
