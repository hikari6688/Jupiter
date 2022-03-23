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
    const d = form.getFieldsValue();
    for (const column of columns) {
      if (column && column.type === 'date' && d[column.dataIndex]) {
        d[column.dataIndex] = d[column.dataIndex].format(column.format);
      }
      if (column && column.type === 'range' && d[column.dataIndex]) {
        d[column.rangeKey[0]] = d[column.dataIndex][0].format(column.format);
        d[column.rangeKey[1]] = d[column.dataIndex][1].format(column.format);
      }
    }
    console.log(d);
    setParams(d);
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
    <Form {...layout} layout="inline" form={form}>
      {(searchCols as Column<IColumn>[]).map((columnProp) => {
        return (
          <Form.Item
            name={columnProp.dataIndex}
            label={columnProp.title}
            key={columnProp.dataIndex as string}
            style={{
              width: `${columnProp.searchWidth || 260}px`,
              marginBottom: '12px',
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
