import { useMemo } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';

import { DEFAULT_PAGE_SIZE } from '../constants';


export interface ILoadingProps {
  columnLength: number;
  rowsCount?: number;
}

const Loading = (props: ILoadingProps): JSX.Element => {
  const { columnLength, rowsCount = DEFAULT_PAGE_SIZE } = props;

  const rows = useMemo(
    () => new Array(rowsCount).fill(null).map((_, idx) => idx),
    [rowsCount],
  );

  const columns = useMemo(
    () => new Array(columnLength).fill(null).map((_, idx) => idx),
    [columnLength],
  );

  return (
    <>
      {rows.map(idx => (
        <TableRow key={idx}>
          {columns.map(_idx => (
            <TableCell key={_idx}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default Loading;
