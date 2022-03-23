import React from 'react';
import { useTable } from '../../../components/Table';
import { IColumn } from '../../../components/Table/table.type';
import moment from 'moment';
const formConf = {
  labelCol: { span: 4 },
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
    rules: [{ required: true, message: '请输入姓名' }],
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
    format: 'YYYY-MM-DD',
  },
  {
    title: '日期范围',
    dataIndex: 'rangeDate',
    type: 'range',
    hide: true,
    // searchWidth:400,
    format: 'YYYY-MM-DD',
    rangeKey: ['start', 'end'],
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
                fixedDate: '2022-1-22',
                address: '西湖区湖底公园1号',
              },
              {
                id: 2,
                name: '胡彦斌',
                age: 32,
                fixedDate: '2022-1-22',
                address: '西湖区湖底公园1号',
              },
              {
                id: '3',
                name: '胡彦斌',
                age: 32,
                fixedDate: '2022-1-22',
                address: '西湖区湖底公园1号',
              },
              {
                id: '4',
                name: '胡彦斌',
                age: 32,
                fixedDate: '2022-1-22',
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
  const beforeOpen = async (type, record) => {
    //do something
    if (type === 'edit') {
      form.setFieldsValue({...record,fixedDate:moment(record.fixedDate, 'YYYY-MM-DD')});
    }
    await g();
    return Promise.resolve();
  };
  const add = async (d) => {
    console.log(d);
    await g();
    return Promise.resolve();
  };
  const update = async (d) => {
    console.log(form.getFieldsValue());
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
        data={data} //数据源
        columns={columns} //行数据
        formConf={formConf} //表单布局
        addBtn={true} //是否有新增按钮
        add={add} // 新增modal点击确认的回调
        update={update} //编辑modal点击确认的回调
        del={del} //colmun删除的回调
        beforeOpen={beforeOpen} //modal弹出前的回调
      />
      ,
    </div>
  );
};
export default App;
