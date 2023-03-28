import { useSelector } from 'react-redux';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete } from '@mui/icons-material';

import { EPermissionAction, IPermission } from 'store/auth/types';
import { makeSelectHasPermission } from 'store/auth/selectors';


export interface IActionsProps {
  permission?: IPermission;
  onEdit?: () => void;
  onDelete?: () => void;
}


const Actions = (props: IActionsProps): JSX.Element | null => {
  const { permission, onEdit, onDelete } = props;
  const hasEditPermission = useSelector(makeSelectHasPermission(permission, EPermissionAction.EDIT));
  const hasDeletePermission = useSelector(makeSelectHasPermission(permission, EPermissionAction.DELETE));

  return (
    <TableCell>
      {hasEditPermission && (
        <IconButton color="primary" onClick={onEdit}>
          <Edit />
        </IconButton>
      )}
      {hasDeletePermission && (
        <IconButton color="primary" onClick={onDelete}>
          <Delete />
        </IconButton>
      )}
    </TableCell>
  );
};

export default Actions;
