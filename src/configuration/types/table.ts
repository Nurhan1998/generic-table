export type TObjectColumn = {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}
export type TObjectData = {
  id: string;
  address: string;
  bort: number;
  actions: number;
};

export type TUsersColumn = {
  id: 'id' | 'name' | 'connectionDate' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
};

export type TUsersData = {
  id: number;
  name: string;
  connectionDate: string;
  actions: number;
}

export type TDocumentColumn = {
  id: 'id' | 'date' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

export type TDocumentData = {
  id: string;
  date: string;
  actions: number;
}
