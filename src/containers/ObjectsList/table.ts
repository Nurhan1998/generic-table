import { ITableColumn } from 'components/Table/types';
import { IConfig, EFieldType, ESelectType } from 'components/Form/types';
import { ISelectOption } from 'components/Select/types';
import { getSingleValue } from 'components/Select/utils';

import { EObjectType, EAreaType } from 'containers/ObjectsList/types';

import { IPermission } from 'store/auth/types';

import { typeLabels, areaTypeLabels, getTypeDisplay, getAreaDisplay } from 'utils/objectiveType';


export const columns: Array<ITableColumn> = [
  {
    id: 'name',
    label: 'Название',
  },
  {
    id: 'uniq_id',
    label: 'Уникальный идентификатор',
  },
  {
    id: 'type',
    label: 'Тип объекта'
  }
];

export const permissionKey: IPermission = {
  appName: 'objective',
  modelName: 'objective'
};


export const filtersConfig: Array<IConfig> = [
  {
    name: 'type',
    label: 'Тип объекта',
    type: EFieldType.SELECT,
    selectType: ESelectType.RAW_SELECT,
    rawData: Object.keys(typeLabels).reduce(
      (memo: Array<ISelectOption>, curr: string) => ([
        ...memo, { value: curr, label: typeLabels[curr as EObjectType] }
      ]),
      []
    ),
    renderChipValue: value => getTypeDisplay(value as EObjectType)
  },
  {
    name: 'area_type',
    label: 'Тип территории',
    type: EFieldType.SELECT,
    selectType: ESelectType.RAW_SELECT,
    rawData: Object.keys(areaTypeLabels).reduce(
      (memo: Array<ISelectOption>, curr: string) => ([
        ...memo, { value: curr, label: areaTypeLabels[curr as EAreaType] }
      ]),
      []
    ),
    showIf: ({ type }) => getSingleValue(type) === EObjectType.AREA.toString(),
    renderChipValue: value => getAreaDisplay(value as EAreaType)
  }
];
