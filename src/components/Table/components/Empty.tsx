import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';


export interface IEmptyProps {
  colSpan: number;
}

const Empty = (props: IEmptyProps): JSX.Element => {
  const { colSpan } = props;
  
  return  (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Typography
          variant="caption"
          color="gray"
          align="center"
          component="p"
        >
          Данных нет...
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default Empty;
