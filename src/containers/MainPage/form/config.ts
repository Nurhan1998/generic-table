import { EFieldType, IConfig } from 'components/Form/types';

const config: Array<IConfig> = [
  {
    type: EFieldType.TEXT,
    name: 'search',
    label: 'Введите идентификатор или фамилию...',
    inputType: 'text',
  },
];

export default config;
