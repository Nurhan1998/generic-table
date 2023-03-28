import React from 'react';
import { Container, Typography } from '@mui/material';

import Table from 'components/Table';

import { IDocumentTableItem } from 'containers/DocumentsList/types';

import { FETCH_DOCUMENTS_DATA_REQUEST } from 'store/documents/actions';

import { columns, permissionKey } from './table';

const TABLE_NAME = 'documentsTable';

const DocumentsList = (): JSX.Element => {

  const normalize = (item: IDocumentTableItem) => ([
    item.name,
    item.author,
  ]);

  return (
    <Container maxWidth="lg">
      <Typography component="h1" variant="h4" my={4}>
        Шаблоны документов
      </Typography>
      <Table<IDocumentTableItem>
        name={TABLE_NAME}
        normalize={normalize}
        fetchAction={FETCH_DOCUMENTS_DATA_REQUEST}
        columns={columns}
        permissionKey={permissionKey}
      />
    </Container>
  );
};

export default DocumentsList;
