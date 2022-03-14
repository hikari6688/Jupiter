import React from 'react';
import { Input, Select, DatePicker, TreeSelect } from 'antd';
import { SearchType} from '../../table.type';
const { RangePicker } = DatePicker;

interface Iprops {
  searchType: SearchType;
  [rest: string]: any;
}

//支持文本 、下拉、 树、时间选择器,时间范围选择器
const SItem = (props: Iprops) => {
  const { searchType, ...rest } = props;
  switch (searchType) {
    case 'input':
      return <Input {...rest} />;
    case 'select':
      return <Select {...rest} />;
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
