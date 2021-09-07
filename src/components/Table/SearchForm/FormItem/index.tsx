import React from 'react';
import { Input, Select, DatePicker, TreeSelect } from 'antd';
import { SearchType } from '../../table.type';
const { RangePicker } = DatePicker;

interface Iprops {
  search: {
    type: SearchType;
    treeData?: [];
  };
  [rest: string]: any;
}

//支持文本 、下拉、 树、时间选择器
const SItem = (props: Iprops) => {
  const { search, ...rest } = props;
  const type = search.type;
  switch (type) {
    case 'input':
      return <Input {...rest} />;
    case 'select':
      return <Select {...rest} />;
    case 'date':
      return <RangePicker {...rest} />;
    case 'tree':
      return (
        <TreeSelect
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={search.treeData}
          treeDefaultExpandAll
          {...rest}
        />
      );
    default:
      break;
  }
  return <span>233</span>;
};

export default SItem;
