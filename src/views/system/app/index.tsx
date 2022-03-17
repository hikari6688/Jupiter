import React, { useEffect, useState, useContext, useRef } from 'react';
import { Button, Input, Tooltip } from 'antd';
import { AuthWrap } from '../../../components/AuthWrap/index.jsx';
import { STable } from '../../../components/Table';
import { IColumn } from '../../../components/Table/table.type';


const formConf = {
  labelCol:{span: 4}
}

const columns: IColumn<any>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    type: 'input',
    inform: true, //是否作为表单配置项
    editDisable: false, //编辑的时候不可编辑
    width: 200,
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    inform: true,
    type: 'input',
  },
  {
    title: '日期',
    dataIndex: 'fixedDate',
    inform: true,
    type: 'date',
  },
  {
    title: '住址',
    dataIndex: 'address',
    type: 'input',
    inform: true,
  },
  {
    title: '类型',
    dataIndex: 'type',
    type: 'select',
    dicKey: 'api',
    inform: true,
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
  const data = async (pagination, query): Promise<any> => {
    const r = (await getList({ ...pagination, ...query })) as any;
    return r.data;
  };
  const beforeOpen = () => {};

  const add = () => {};
  const update = () => {};
  const deleteData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('');
      }, 1000);
    });
  };
  const del = async () => {
    return await deleteData();
  };
  return (
    <div>
      <STable
        data={data}
        columns={columns}
        beforeOpen={beforeOpen}
        add={add}
        update={update}
        del={del}
        formConf={formConf}
      />
    </div>
  );
};
export default App;
