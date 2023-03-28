import { EObjectType, EAreaType } from 'containers/ObjectsList/types';

import safeGet from 'utils/safeGet';


export const typeLabels = {
  [EObjectType.MARKETPLACE]: 'Место на рынке',
  [EObjectType.AREA]: 'Территория',
  [EObjectType.TRADE_CENTER]: 'Торговый центр',
  [EObjectType.BUSINESS_CENTER]: 'Бизнес центр'
};

export const areaTypeLabels = {
  [EAreaType.LAND_PLOT]: 'Земельный участок',
  [EAreaType.NON_RESIDENTIAL_PREMISES]: 'Нежилое помещение',
  [EAreaType.OTHER]: 'Другое'
};


export const getTypeDisplay = (type: EObjectType): string => safeGet(typeLabels, type, type.toString());

export const getAreaDisplay = (type: EAreaType): string => safeGet(areaTypeLabels, type, type.toString());
