import React, { useEffect, useState, useContext, useRef } from 'react';
import { Button, Input, Tooltip } from 'antd';
import { AuthWrap } from '../../../components/AuthWrap/index.jsx';
import { STable } from '../../../components/Table';
import {
  useLocalStorage,
  useDebounce,
  useModal,
  useFullScreen,
  useLoop,
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
const App = () => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
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

  //表格搜索配置

  const [user, setUser] = useLocalStorage('user');
  const [value, setValue] = useState();
  const theme = useContext(ThemeContext);
  const [start, stop] = useLoop(function () {
    console.log('loooop');
  }, 1000);
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
  interface ResType {
    code: number;
    data: {
      current?: number;
      total?: number;
      result?: [{}];
    };
  }

  const data = (pagination): Promise<any> => {
    return getList(pagination).then((r: any) => {
      return r.data;
    });
  };
  const onChange = (pagination): void => {
    // console.log(pagination);
  };
  const deletUser = () => {
    // setShow(true);
    // toggleFullScreen();
    setUser({ name: 233 }, [10, 's']);

    debugger;
    // setTimeout(() => {
    //   popup.postMessage('Hello World!', '*');
    // }, 100);
  };
  const print = (v): void => {
    console.log(v);
  };
  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, []);
  const run = useDebounce(print, 1000);
  return (
    <div ref={inputEl}>
      <STable data={data as any} columns={columns} />
      <CustomModal />
    </div>
  );
};
export default App