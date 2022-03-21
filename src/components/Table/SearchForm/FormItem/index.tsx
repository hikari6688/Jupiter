import React, { useEffect, useState } from 'react';
import { Input, Select, DatePicker, TreeSelect } from 'antd';
import moment, { Moment } from 'moment';
const { RangePicker } = DatePicker;
const { Option } = Select;

interface IdicData {
  label: string;
  value: any;
}
//支持文本 、下拉、 树、时间选择器,时间范围选择器
const FormItem = (props) => {
  const [asyncDicData, setAsyncDicData] = useState<IdicData[]>([]);
  const {
    type,
    dicData,
    dataIndex,
    searchWidth,
    editDisable,
    dicKey,
    inform,
    // onChange,
    formate,
    ...rest
  } = props;
  useEffect(() => {
    if (props.dicKey) {
      //fetch...
      setAsyncDicData([{ label: 'key测试', value: 'testkey' }]);
    }
  }, []);

  const formateDate = (dataIndex, formate) => {
    console.log({ dataIndex, formate });
  };

  switch (type) {
    case 'input':
      return <Input {...rest} />;
    case 'select':
      return (
        <Select showSearch {...rest}>
          {dicData
            ? dicData.map((dicItem) => {
                return (
                  <Option key={dicItem.value} value={dicItem.value}>
                    {dicItem.label}
                  </Option>
                );
              })
            : props.dicKey &&
              asyncDicData.map((dicItem) => {
                return (
                  <Option
                    key={dicItem.value + Math.random()}
                    value={dicItem.value}
                  >
                    {dicItem.label}
                  </Option>
                );
              })}
        </Select>
      );
    case 'date':
      return (
        <DatePicker
          // onChange={(date: Moment, dateString: string) => {
          //   formateDate(date,dateString) 
            
          // }}
          style={{ width: '100%' }}
          {...rest}
        />
      );
    case 'range':
      return (
        <RangePicker
          // onChange={(date: Moment, dateString: string) => {
          //   console.log(222);
          // }}
          style={{ width: '100%' }}
          {...rest}
        />
      );
    case 'tree':
      return (
        <TreeSelect
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeDefaultExpandAll
          {...rest}
        />
      );
    default:
      return null;
  }
};

export default FormItem;
