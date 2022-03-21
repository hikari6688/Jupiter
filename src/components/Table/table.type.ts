import { TableProps, ColumnType } from 'antd/lib/table';
import { ReactElement } from 'react';

export type TSearchObject = { [prop: string]: any } | undefined;

export type SearchType = 'input' | 'select' | 'tree' | 'date' | 'range';

export interface Pagination {
  total?: number;
  pageSize: number;
  current: number;
}
export interface BaseTableProps<T> extends TableProps<T> {
  addBtn?: boolean; //表格新增按钮
  delBtn?: boolean; //表格行删除按钮
  editBtn?: boolean; //表格行编辑按钮
  columns: IColumn[]; //表格表头配置
  formConf?: { [arg: string]: any }; //表格布局配置
  data: (pagination: Pagination, query: TSearchObject) => Promise<T>; //表格数据源
  beforeOpen?: (record: any) => Promise<any>; //modal打开前的回调
  beforeClose?: () => Promise<any>; //modal关闭前的回调
  onChange?: (pagination: Pagination, query: TSearchObject) => void; //表格搜索触发回调
  add?: (d?: {}) => Promise<any>; //在modal中新增
  update?: (d?: {}) => Promise<any>; //在modal中更新编辑
  del?: () => Promise<any>; //点击行删除触发
  onOk?: (d?: {}) => Promise<any>; //点击modal确定的回调
  onCancel?: () => Promise<any>; //modal关闭前的回调
}

export interface Column<RecordType> extends ColumnType<RecordType> {
  type?: SearchType; //字段在表单中的类型枚举
  searchWidth?: number; // 表单项的宽度
  dicData?: { [dicItem: string]: any }[]; //下拉的字典映射map
  dicKey?: string; //字典的请求 key(通用接口)
  inform?: boolean; //是否展示在表单中
  editDisable?: boolean; //编辑的时候是否禁止
  dataIndex?: string; //column-key
  rules?: any[]; //表单项验证
  span?: number; //表单栅格布局
  preview?: boolean; //是否作为图片预览
  format?: string; //时间格式化配置
  formRender?: ({}) => ReactElement; //自定义表单项
}

export interface IColumn<RecordType = unknown> extends Column<RecordType> {
  children?: Column<RecordType>; //扩展树形表格
}

// export declare type IColumn<RecordType = unknown> =
//   | ColumnGroupType<RecordType>
//   | Column<RecordType>;
