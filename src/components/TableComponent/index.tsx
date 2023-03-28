import React  from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import {
  TDocumentColumn,
  TDocumentData,
  TObjectColumn,
  TObjectData,
  TUsersColumn,
  TUsersData
} from 'configuration/types/table';

import safeGet from 'utils/safeGet';

type TTableProps = {
  TableHeader?: JSX.Element;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columns: TObjectColumn[] | TUsersColumn[] | TDocumentColumn[];
  rows: TObjectData[] | TUsersData[] | TDocumentData[];
};

const TableComponent = ({
  TableHeader,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  columns = [],
  rows,
}: TTableProps): JSX.Element => (
  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    { TableHeader && TableHeader}
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.actions}>
                {columns.map(column => {
                  const value = safeGet<TObjectData | TUsersData, string | number>(row, column.id, '');
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>
);

export default TableComponent;
