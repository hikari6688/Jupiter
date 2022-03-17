import React from 'react';
import { Table, Form, Space, Button, Row, Col, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Pagination, BaseTableProps, TSearchObject } from './table.type';
import { useModal } from '../../hooks';
import style from './index.module.scss';
import SearchForm from './SearchForm/index';
import FormItem from './SearchForm/FormItem';
const { confirm } = Modal;
export const STable = (props: BaseTableProps<any>) => {
  const { columns, data, beforeOpen, add, update, del, formConf, ...rest } =
    props;
  const [loading, setLoading] = useState<boolean>(false); //表格加载动画
  const [tableData, setTableData] = useState<[]>([]); //表格数据源
  const [params, setParams] = useState<TSearchObject>({}); //搜索参数
  const [form] = Form.useForm();
  const [page, setPage] = useState<Pagination>({
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const [setShow, CustomModal] = useModal('编辑');
  const getTableData = async (): Promise<void> => {
    setLoading(true);
    try {
      const { _reset, ...restArgs } = params;
      if (_reset) {
        setPage({ ...page, current: 1 });
        setParams({ _reset: false });
      }
      const { total, result } = await data(page, restArgs);
      setPage({ ...page, total });
      setTableData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTableData();
  }, [page.current, page.pageSize, params]);

  const crud = (): [{}] => {
    return [
      {
        title: '操作',
        key: 'action',
        width: 160,
        align: 'center',
        render: (text, record) => (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setShow(true);
              }}
            >
              编辑
            </Button>
            <Button
              onClick={() => {
                showPromiseConfirm();
              }}
              type="primary"
              danger
              size="small"
            >
              删除
            </Button>
          </Space>
        ),
      },
    ];
  };
  const onOk = () => {};
  const showPromiseConfirm = () => {
    confirm({
      title: '是否确认删除该数据?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          await del();
          message.success('数据删除成功!');
          return Promise.resolve();
        } catch (error) {
          return Promise.reject();
        }
      },
      onCancel() {},
    });
  };
  return (
    <div className={style.table_wrap}>
      <div className={style.search}>
        <SearchForm columns={columns} setParams={setParams} />
      </div>
      <div className={style.stage}>
        <Table
          rowKey="id"
          bordered
          size="small"
          loading={loading}
          dataSource={tableData}
          pagination={page}
          onChange={(pagination: Pagination) => {
            setPage({ ...pagination });
          }}
          columns={props.columns.concat(crud())}
          {...rest}
        />
      </div>
      <CustomModal onOk={onOk}>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          style={{ width: '100%' }}
          {...formConf}
        >
          <Row>
            {columns.map((column) => {
              if (!column.inform) return null;
              const { dataIndex, title } = column;
              return (
                <Col key={dataIndex} span={column.span || 12}>
                  <Form.Item label={title}>
                    <FormItem {...column} />
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        </Form>
      </CustomModal>
    </div>
  );
};
