import { EFieldType, IConfig } from 'components/Form/types';


const config: Array<IConfig> = [
  {
    type: EFieldType.TEXT,
    name: 'email',
    label: 'E-Mail',
    inputType: 'email',
    required: true,
  },
  {
    type: EFieldType.TEXT,
    name: 'password',
    label: 'Пароль',
    inputType: 'password',
    required: true,
  }
];

export default config;
