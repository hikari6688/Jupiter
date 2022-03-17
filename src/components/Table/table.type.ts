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
  beforeOpen: () => void;
  add: () => void;
  del: () => Promise<any>;
  update: () => void;
  formConf?: { [arg: string]: any };
  preview?: boolean; //是否作为图片预览
}

export interface Column<RecordType> extends ColumnType<RecordType> {
  type?: SearchType;
  searchWidth?: number;
  dicData?: { [dicItem: string]: any }[];
  dicKey?: string;
  inform?: boolean; //是否展示在表单中
  editDisable?: boolean; //编辑的时候是否禁止
  dataIndex?: string;
  rules?: any[];
  span?: number;
}

export interface ColumnGroupType<RecordType> extends Column<RecordType> {
  children: Column<RecordType>;
}

export declare type IColumn<RecordType = unknown> =
  | ColumnGroupType<RecordType>
  | Column<RecordType>;

//serchFrom

//serchFromItem
