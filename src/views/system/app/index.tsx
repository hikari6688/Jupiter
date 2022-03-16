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
    width: 200,
    ellipsis: {
      showTitle: true,
    },
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
  {
    title: '类型',
    dataIndex: 'type',
    searchType: 'select',
    dicKey:'api'
    // dicData: [
    //   {
    //     label: '测试',
    //     value: 1,
    //   },
    // ],
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
  const data =  async (pagination, query): Promise<any> => {
    const r = await getList({ ...pagination, ...query }) as any;
    return r.data;
  };
  return (
    <div>
      <STable data={data} columns={columns} />
    </div>
  );
};
export default App;
