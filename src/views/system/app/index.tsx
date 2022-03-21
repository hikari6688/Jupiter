import React from 'react';
import { useTable } from '../../../components/Table';
import { IColumn } from '../../../components/Table/table.type';

const formConf = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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
    format:"YYYY-MM-DD HH:mm",
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
    // formRender: () => <a>222</a>,
  },
];
const App = () => {
  const [Table, form] = useTable();
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
  const g = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('');
      }, 200);
    });
  };
  const beforeOpen = async (record) => {
    //do something
    await g();
    return Promise.resolve();
  };
  const add = async (d) => {
    console.log(d)
    await g();
    return Promise.resolve();
  };
  const update = async (d) => {
    console.log(form.getFieldsValue())
  };
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
      <Table
        data={data}
        columns={columns}
        formConf={formConf}
        addBtn={true}
        add={add}
        update={update}
        del={del}
        beforeOpen={beforeOpen}
      />
      ,
    </div>
  );
};
export default App;
