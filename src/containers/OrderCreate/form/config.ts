import { EFieldType, IConfig } from 'components/Form/types';

export const ORDER_CREATE_FORM_NAME = 'orderCreateForm';

const config: Array<IConfig> = [
  {
    type: EFieldType.TEXT,
    name: 'number',
    label: 'Приказ',
    inputType: 'text',
    required: true,
  },
  {
    type: EFieldType.TEXTAREA,
    name: 'description',
    label: 'Описание',
    inputType: 'text-area',
    required: true,
  }
];

export default config;
