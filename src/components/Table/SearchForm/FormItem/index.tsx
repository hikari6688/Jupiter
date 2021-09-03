import React from 'react';
import { Input, Select, DatePicker, TreeSelect } from 'antd';
const { RangePicker } = DatePicker;
type SearchType = 'input' | 'select' | 'tree' | 'date';

//支持文本 、下拉、 树、时间选择器
const SItem = (prop) => {
  const { conf, ...rest } = prop;
  const type = conf.type;
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
          treeData={conf.treeData}
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
