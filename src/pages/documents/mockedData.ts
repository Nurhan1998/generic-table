import { TSelectDocument } from 'configuration/types/documents';

export const singleDocumentSelectTypes: TSelectDocument[] = [
  {
    id: 0,
    label: 'Переоформить',
    value: 're-register',
  },
  {
    id: 1,
    label: 'Пролонгация',
    value: 'prolongation',
  },
  {
    id: 2,
    label: 'Субаренда',
    value: 'sub-rent',
  },
  {
    id: 3,
    label: 'Претензионная работа',
    value: 'claim-work',
  },
];

export const singleDocumentSelectOformlenie: TSelectDocument[] = [
  {
    id: 0,
    label: 'Рынок',
    value: 'market',
  },
  {
    id: 1,
    label: 'Территория',
    value: 'territory',
  },
  {
    id: 2,
    label: 'Торговый центр',
    value: 'shopping-center',
  },
  {
    id: 3,
    label: 'Бизнес центр',
    value: 'business-center',
  },
];

export const singleDocumentSelectContrAgent: TSelectDocument[] = [
  {
    id: 0,
    label: 'Физическое лицо',
    value: 'individual',
  },
  {
    id: 1,
    label: 'Юридическое лицо',
    value: 'entity',
  },
];

export const singleDocumentSelectTypeOfTransaction: TSelectDocument[] = [
  {
    id: 0,
    label: 'Купля-продажи',
    value: 'buy-sell',
  },
  {
    id: 1,
    label: 'Дарение',
    value: 'gift',
  },
  {
    id: 2,
    label: 'Нотариально',
    value: 'notarized',
  },
  {
    id: 3,
    label: 'Наследство',
    value: 'inheritance',
  },
];

export const singleDocumentSelectSide: TSelectDocument[] = [
  {
    id: 0,
    label: '1*1',
    value: '1*1',
  },
  {
    id: 1,
    label: '1*2',
    value: '1*2',
  },
  {
    id: 2,
    label: '2*1',
    value: '2*1',
  },
  {
    id: 3,
    label: '2*2',
    value: '2*2',
  },
];

export const singleDocumentSelectNameOfDocument: TSelectDocument[] = [
  {
    id: 0,
    label: 'Объект',
    value: 'object',
  },
];

export const singleDocumentSelectInfoAboutAgreement: TSelectDocument[] = [
  {
    id: 0,
    label: 'Есть',
    value: 'has',
  },
  {
    id: 1,
    label: 'Нет',
    value: 'has not',
  },
];

export const PLACEHOLDERS = [
  {
    id: 1,
    name: 'address',
    title: 'Address',
    description: 'Customer Support correspondence address.'
  },
  {
    id: 2,
    name: 'assignee',
    title: 'Assignee Name',
    description: 'Ticket assignee name.'
  },
  {
    id: 3,
    name: 'deadline',
    title: 'Deadline Time',
    description: 'Utmost time to which technician should handle the issue.'
  },
  {
    id: 4,
    name: 'department',
    title: 'Department Name',
    description: 'Department name responsible for servicing this ticket.'
  },
  {
    id: 5,
    name: 'caseid',
    title: 'Case ID',
    description: 'Unique case number used to distinguish tickets.'
  },
  {
    id: 6,
    name: 'casename',
    title: 'Case Name',
    description: 'Name of the ticket provided by the user.'
  },
  {
    id: 7,
    name: 'contact',
    title: 'Contact E-mail',
    description: 'Customer Support contact e-mail address.'
  },
  {
    id: 8,
    name: 'customer',
    title: 'Customer Name',
    description: 'Receipent of your response.'
  },
  {
    id: 9,
    name: 'hotline',
    title: 'Hotline Number',
    description: 'Customer Support Hotline number.'
  },
  {
    id: 10,
    name: 'technician',
    title: 'Technician Name',
    description: 'Technician which will handle this ticket.'
  }
];
