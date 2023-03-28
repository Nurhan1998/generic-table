import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Table from 'components/Table';

import { FETCH_DATA_REQUEST } from 'store/objects/actions';

import { getTypeDisplay, getAreaDisplay } from 'utils/objectiveType';

import { EObjectType, IObjectTableItem } from './types';
import { columns, permissionKey, filtersConfig } from './table';


const TABLE_NAME = 'objectsTable';

const Object = ():JSX.Element => {

  const normalize = (item: IObjectTableItem) => ([
    item.name,
    item.uniq_id,
    (
      <>
        <Typography variant="subtitle1">{getTypeDisplay(item.type)}</Typography>
        {item.type === EObjectType.AREA && (
          <Typography variant="caption">{getAreaDisplay(item.area_type)}</Typography>
        )}
      </>
    )
  ]);

  return (
    <Container maxWidth="lg">
      <Typography component="h1" variant="h4" my={4}>
        Объекты
      </Typography>
      <Table<IObjectTableItem>
        name={TABLE_NAME}
        normalize={normalize}
        fetchAction={FETCH_DATA_REQUEST}
        columns={columns}
        permissionKey={permissionKey}
        filterConfig={filtersConfig}
      />
    </Container>
  );
};

export default Object;
