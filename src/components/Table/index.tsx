import React, { useEffect, useState } from 'react';
import { Table, Form, Space, Button, Row, Col, Modal, message } from 'antd';
import moment, { Moment } from 'moment';
import {
  ExclamationCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Pagination, BaseTableProps, TSearchObject } from './table.type';
import { useModal } from '../../hooks';
import style from './index.module.scss';
import SearchForm from './SearchForm/index';
import FormItem from './SearchForm/FormItem';
const { confirm } = Modal;
type mode = 'edit' | 'add';
export const useTable = () => {
  const [form] = Form.useForm();
  const STable = (props: BaseTableProps<any>) => {
    const { columns, data, beforeOpen, add, update, del, formConf, ...rest } =
      props;
    const [loading, setLoading] = useState<boolean>(false); //表格加载动画
    const [tableData, setTableData] = useState<[]>([]); //表格数据源
    const [params, setParams] = useState<TSearchObject>({}); //搜索参数
    const [formMode, setFormMode] = useState<mode>('edit'); //外部判断新增还是编辑
    const [page, setPage] = useState<Pagination>({
      total: 0,
      pageSize: 10,
      current: 1,
    });
    const [setShow, CustomModal, setTitle] = useModal();
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
                icon={<EditOutlined />}
                onClick={async () => {
                  setTitle('编辑');
                  setFormMode('edit');
                  if (beforeOpen) await beforeOpen(record);
                  setShow(true);
                }}
              >
                {/* 编辑 */}
              </Button>
              <Button
                onClick={() => {
                  showPromiseConfirm();
                }}
                type="primary"
                danger
                size="small"
                icon={<DeleteOutlined />}
              >
                {/* 删除 */}
              </Button>
            </Space>
          ),
        },
      ];
    };

    const onOk = async () => {
      const d = form.getFieldsValue();
      for (const column of columns) {
        if (column.type === 'date') {
          d[column.dataIndex] = d[column.dataIndex].format(column.format);
        }
      }

      switch (formMode) {
        case 'add':
          await props.add(d);
          message.success('新增成功!');
          break;
        case 'edit':
          await props.update(d);
          message.success('更新成功!');
          break;
        default:
          await props.onOk(d);
          message.success('操作成功!');
          break;
      }
      setShow(false);
    };
    const onCancel = async () => {
      await props.onCancel();
      setShow(false);
    };
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
        <div className={style.handel}>
          <Button
            onClick={() => {
              setTitle('新增');
              setFormMode('add');
              setShow(true);
            }}
            type="primary"
            icon={<PlusOutlined />}
          >
            新增
          </Button>
        </div>
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
        <CustomModal
          onOk={onOk}
          onCancel={props.onCancel ? onCancel : undefined}
          form={form}
        >
          <Form
            form={form}
            autoComplete="off"
            style={{ width: '100%' }}
            {...formConf}
          >
            <Row>
              {columns.map((column) => {
                if (!column.inform) return null;
                const { dataIndex, title, rules } = column;
                return (
                  <Col key={dataIndex} span={column.span || 12}>
                    <Form.Item name={dataIndex} label={title} rules={rules}>
                      {column.formRender ? (
                        column.formRender(column)
                      ) : (
                        <FormItem {...column} />
                      )}
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
  return [STable, form] as const;
};
