import React, { useEffect, useState, useContext, useRef } from 'react';
import { Button, Input } from 'antd';
import { AuthWrap } from '../../../components/AuthWrap/index.jsx';
import { STable } from '../../../components/Table';
import {
  useLocalStorage,
  useDebounce,
  useModal,
  useFullScreen,
} from '../../../hooks/index';
import { ThemeContext } from '../../../context/index';
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
  const [user, setUser] = useLocalStorage('user');
  const [value, setValue] = useState();
  const theme = useContext(ThemeContext);
  const content = <div>2333</div>;
  const inputEl = useRef();
  const { setShow, CustomModal } = useModal({ title: '设置', content });
  const { toggleFullScreen } = useFullScreen(inputEl);
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
  const data = (pagination): any => {
    return getList(pagination).then((r) => {
      return r;
    });
  };
  const onChange = (pagination): void => {
    console.log(pagination);
  };
  useEffect(() => {
    console.log(user);
  }, [user]);
  const deletUser = () => {
    // setShow(true);
    // toggleFullScreen();
   
  };
  const print = (v): void => {
    console.log(v);
  };
  const run = useDebounce(print, 1000);
  return (
    <div ref={inputEl}>
      <STable  onChange={onChange} data={data as any} columns={columns} />
      <p className="dima">apppp</p>
      <Input
        value={value}
        type="text"
        onInput={(e) => {
          run(e.currentTarget.value);
        }}
      />
      <AuthWrap auth={'app:add'}>
        <Button onClick={deletUser}>删除</Button>
      </AuthWrap>
      <AuthWrap auth={'app:update'}>
        <Button>编辑</Button>
      </AuthWrap>
      <CustomModal />
    </div>
  );
};
