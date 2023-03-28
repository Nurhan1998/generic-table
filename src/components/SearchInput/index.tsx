import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import cn from 'classnames';

import { ISearchInputProps } from './types';
import useStyles from './styles';


const SearchInput = (props: ISearchInputProps): JSX.Element => {
  const {
    value,
    onChange,
    className,
    label = 'Поиск...'
  } = props;
  const { classes } = useStyles();

  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.iconWrapper}>
        <SearchIcon />
      </div>
      <InputBase
        className={classes.input}
        placeholder={label}
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
