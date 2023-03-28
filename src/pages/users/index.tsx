import { useState } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';

import { TUsersColumn, TUsersData } from 'configuration/types/table';

import TableComponent from 'components/TableComponent';

import UserTableHeader from 'pages/users/UserTableHeader';
import UserAddNewModal from 'pages/users/UserAddNewModal';

type TTabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const columns: TUsersColumn[] = [
  {
    id: 'name',
    label: 'ФИО пользователей',
    align: 'left',
    minWidth: 170
  },
  {
    id: 'connectionDate',
    label: 'Дата присоидинения',
    align: 'center',
    minWidth: 100
  },
  {
    id: 'actions',
    label: 'Действия',
    align: 'center',
    minWidth: 170,
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

const rows: TUsersData[] = [
  { id: 0, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 1, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 2, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 3, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 4, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 5, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 6, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 7, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 8, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 9, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 10, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 11, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 12, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 13, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 14, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 15, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 16, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 17, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
  { id: 18, name: 'Иванов Иван Иванович', connectionDate: '21.01.2021', actions: 3287263 },
];

function TabPanel(props: TTabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Users = (): JSX.Element => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [valueOfTab, setValueOfTab] = useState(0);
  const [showAddNew, setShowAddNew] = useState<boolean>(false);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setValueOfTab(newValue);
  };

  const handleChangeAddNew = () => {
    setShowAddNew(prev => !prev);
  };

  return (
    <Container maxWidth="lg">
      <Typography component="h1" variant="h4" my={4}>
        Пользователи
      </Typography>
      <Paper sx={{ width: '100%' }}>
        <UserTableHeader
          handleAdd={handleChangeAddNew}
          value={valueOfTab}
          handleChange={handleChangeTab}
        />
        <TabPanel value={valueOfTab} index={0}>
          <TableComponent
            handleChangePage={handleChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            columns={columns}
            rows={rows}
          />
        </TabPanel>
        <TabPanel value={valueOfTab} index={1}>
          <TableComponent
            handleChangePage={handleChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            columns={columns}
            rows={rows}
          />
        </TabPanel>
      </Paper>
      <UserAddNewModal handleClose={handleChangeAddNew} open={showAddNew} />
    </Container>
  );
};

export default Users;
