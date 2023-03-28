import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';

import Table from 'components/Table';


import { IOrderTableItem } from 'containers/OrdersList/types';

import { FETCH_DATA_REQUEST } from 'store/objects/actions';

import { columns, permissionKey } from './table';

const TABLE_NAME = 'ordersTable';

const OrdersList = (): JSX.Element => {
  const normalize = (item: IOrderTableItem) => ([
    item.id,
    item.create_date,
    // (
    //   <>
    //     <Typography variant="subtitle1">{getTypeDisplay(item.type)}</Typography>
    //     {item.type === EObjectType.AREA && (
    //       <Typography variant="caption">{getAreaDisplay(item.area_type)}</Typography>
    //     )}
    //   </>
    // )
  ]);

  return(
    <Container maxWidth="lg">
      <Typography component="h1" variant="h4" my={4}>
        Приказы
      </Typography>
      <Table<IOrderTableItem>
        name={TABLE_NAME}
        normalize={normalize}
        fetchAction={FETCH_DATA_REQUEST}
        columns={columns}
        permissionKey={permissionKey}
      />
    </Container>
  );
};

export default OrdersList;
