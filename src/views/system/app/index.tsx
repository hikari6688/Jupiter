import React, { useEffect, useState, useContext, useRef } from 'react';
import { Button, Input, Tooltip } from 'antd';
import { AuthWrap } from '../../../components/AuthWrap/index.jsx';
import { STable } from '../../../components/Table';
import { IColumn } from '../../../components/Table/table.type';

const columns: IColumn<any>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    searchType: 'input',
    width: 120,
    ellipsis: true,
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    searchType: 'input',
  },
];
const App = () => {
  //表格搜索配置
  const getList = (params) => {
    return new Promise((resolve) => {
      setTimeout((r) => {
        const res = {
          code: 200,
          message: 'success',
          data: {
            current: 1,
            total: 12,
            result: [
              {
                id: 1,
                name: '胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
              },
              {
                id: 2,
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
              },
              {
                id: '3',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
              },
              {
                id: '4',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
              },
            ],
          },
        };
        resolve(res);
      }, 1000);
    });
  };
  const data = (pagination, query): Promise<any> => {
    // console.log({ ...pagination, ...query });
    return getList({ ...pagination, ...query }).then((r: any) => {
      return r.data;
    });
  };
  return (
    <div>
      <STable data={data} columns={columns} />
    </div>
  );
};
export default App;
