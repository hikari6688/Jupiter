import { TableProps, ColumnType } from 'antd/lib/table';

export type TSearchObject = { [prop: string]: any } | undefined;

export type SearchType = 'input' | 'select' | 'tree' | 'date' | 'range';

export interface Pagination {
  total?: number;
  pageSize: number;
  current: number;
}

export interface BaseTableProps<T> extends TableProps<T> {
  data: (pagination: Pagination, query: TSearchObject) => Promise<T>;
  onChange?: (pagination: Pagination, query: TSearchObject) => void;
  searchBtn?: boolean;
  resetBtn?: boolean;
  columns: IColumn[];
}

export interface Column<RecordType> extends ColumnType<RecordType> {
  searchType?: SearchType;
}

export interface ColumnGroupType<RecordType>
  extends Omit<Column<RecordType>, 'dataIndex'> {
  children: Column<RecordType>;
}

export declare type IColumn<RecordType = unknown> =
  | ColumnGroupType<RecordType>
  | Column<RecordType>;

//serchFrom

//serchFromItem
