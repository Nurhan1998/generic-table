import { ITableItem } from 'store/table/types';

export interface IDocumentTableItem extends ITableItem{
  id: string;
  name:	string;
  text:	string;
  action:	string;
  objective_type:	string;
  area_sub_type:	string;
  customer_type:	string;
  customer_sides:	string;
  transaction_type:	string;
  is_active: boolean;
  author:	string;
}
