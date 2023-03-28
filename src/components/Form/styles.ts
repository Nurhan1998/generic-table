import { makeStyles } from 'tss-react/mui';

import { EFormOrientation } from './types';


const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    gap: theme.spacing(2),
  },
  [EFormOrientation.VERTICAL]: {
    flexDirection: 'column',
  },
  [EFormOrientation.HORIZONTAL]: {
    flexDirection: 'row',
  },
  inputRoot: {}
}));

export default useStyles;
