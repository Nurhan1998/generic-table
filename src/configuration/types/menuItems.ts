import { SearchRounded, DashboardRounded, Group, Article, Assignment, SvgIconComponent } from '@mui/icons-material';

import { DOCUMENT, HOME_PAGE, OBJECT, ORDERS, USER } from 'configuration/urls';

export type MenuItem = {
  label: string;
  url: string;
  id: number;
  Icon: SvgIconComponent;
}

export const menuItems: MenuItem[] = [
  {
    label: 'Поиск',
    url: HOME_PAGE,
    id: 1,
    Icon: SearchRounded,
  },
  {
    label: 'Объекты',
    url: OBJECT,
    id: 2,
    Icon: DashboardRounded,
  },
  {
    label: 'Пользователи',
    url: USER,
    id: 3,
    Icon: Group,
  },
  {
    label: 'Шаблоны документов',
    url: DOCUMENT,
    id: 4,
    Icon: Article,
  },
  {
    label: 'Приказы',
    url: ORDERS,
    id: 5,
    Icon: Assignment,
  },
];
