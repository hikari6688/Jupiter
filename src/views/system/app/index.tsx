import React from 'react';
import { Button } from 'antd';
import { AuthWrap } from '../../../components/AuthWrap/index.jsx';
import { STable } from '../../../components/Table';
import { resolve } from 'dns';
interface resType {
  code: number;
  data: {
    current: number;
    total: number;
    result: [];
  };
}
export const App = () => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

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
                key: '1',
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
  interface ResType {
    code: number;
    data: {
      current?: number;
      total?: number;
      result?: [{}];
    };
  }
  const data = (pagination):any => {
    return getList(pagination).then((r) => {
      return r;
    });
  };
  const onChange = (pagination): void => {
    console.log(pagination);
  };
  return (
    <div>
      <STable onChange={onChange} data={data as any} columns={columns} />
      <p>apppp</p>
      <AuthWrap auth={'app:add'}>
        <Button>删除</Button>
      </AuthWrap>
      <AuthWrap auth={'app:update'}>
        <Button>编辑</Button>
      </AuthWrap>
    </div>
  );
};
