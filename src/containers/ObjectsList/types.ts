import { ITableItem } from 'store/table/types';


export enum EObjectType {
  MARKETPLACE = 'marketplace',
  AREA = 'area',
  TRADE_CENTER = 'trade_center',
  BUSINESS_CENTER = 'business_center'
}

export enum EAreaType {
  LAND_PLOT = 'land_plot',
  NON_RESIDENTIAL_PREMISES = 'non-residential_premises',
  OTHER = 'other'
}

export interface IObjectTableItem extends ITableItem {
  name: string;
  uniq_id: string;
  address: string;
  cost: string;
  type: EObjectType;
  area_type: EAreaType;
  size?: string;
  container_number?: string;
  note?: string;
}