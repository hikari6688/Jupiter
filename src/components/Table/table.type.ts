import { TableProps, ColumnType } from 'antd/lib/table';

export type Sin = { [prop: string]: any } | undefined;

export type SearchType = 'input' | 'select' | 'tree' | 'date';

export interface Isearch{
  type:SearchType;
  treeData?:[];
  [rest:string]:any;
}

export interface Pagination {
  total?: number;
  pageSize: number;
  current: number;
}

export interface BaseTableProps<T> extends TableProps<T> {
  data: (pagination: Pagination, query: Sin) => Promise<T>;
  onChange?: (pagination: Pagination, query: Sin) => void;
  searchBtn?: boolean;
  resetBtn?: boolean;
  columns:IColumn[]
}

export interface Column<RecordType> extends ColumnType<RecordType> {
  search?: Isearch;
}

export interface ColumnGroupType<RecordType>
  extends Omit<Column<RecordType>, 'dataIndex'> {
  children: Column<RecordType>;
}

export declare type IColumn<RecordType = unknown> = (
  | ColumnGroupType<RecordType>
  | Column<RecordType>
);

//serchFrom

//serchFromItem
