import React, { useEffect, useRef } from 'react';
import { Input, Select, DatePicker, TreeSelect } from 'antd';
import { Column } from '../../table.type';
const { RangePicker } = DatePicker;
const { Option } = Select;

interface IdicData {
  label: string;
  value: any;
}
//支持文本 、下拉、 树、时间选择器,时间范围选择器
const SItem = (props) => {
  const { searchType, dicData, dataIndex, searchWidth, dicKey, ...rest } =
    props;
  const dicRefData = useRef([]);
  useEffect(() => {
    if (props.dicKey) {
      //fetch...
      dicRefData.current = [{ label: 'key测试', value: 'testkey' }];
    }
  }, []);

  switch (searchType) {
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
              dicRefData.current.map((dicItem) => {
                return (
                  <Option key={dicItem.value} value={dicItem.value}>
                    {dicItem.label}
                  </Option>
                );
              })}
        </Select>
      );
    case 'date':
      return <DatePicker {...rest} />;
    case 'range':
      return <RangePicker {...rest} />;
    case 'tree':
      return (
        <TreeSelect
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeDefaultExpandAll
          {...rest}
        />
      );
    default:
      break;
  }
};

export default SItem;
