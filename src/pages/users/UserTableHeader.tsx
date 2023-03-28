import { Box, Tabs, Tab, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

import { flexBetweenCenter } from 'configuration/globalStyles';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const tabs = [
  {
    id: 0,
    label: 'Администраторы',
  },
  {
    id: 1,
    label: 'Клиенты',
  }
];

type TUserTableHeaderProps = {
  value: number;
  handleChange: (_event: React.SyntheticEvent, newValue: number) => void;
  handleAdd: () => void;
}

const UserTableHeader =
  ({
    value,
    handleChange,
    handleAdd
  }: TUserTableHeaderProps):JSX.Element => (

    <Box sx={{ width: '100%' }} px={2}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', ...flexBetweenCenter }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {
            tabs.map(item => (
              <Tab key={item.id} label={item.label} {...a11yProps(item.id)} />
            ))
          }
        </Tabs>
        <Button onClick={handleAdd} variant={'contained'} startIcon={<Add />}>Создать</Button>
      </Box>
    </Box>
  );

export default UserTableHeader;
