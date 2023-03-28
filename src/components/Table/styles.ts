import { makeStyles } from 'tss-react/mui';


const useStyles = makeStyles()(theme => ({
  root: {

  },
  paginationWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  leftSideToolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: theme.spacing(2)
  },
  formWrapper: {
    minWidth: 350,
    padding: theme.spacing(2),
  },
  filtersForm: {
    marginBottom: theme.spacing(2)
  },
  filtersHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  filtersHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: theme.spacing(2)
  },
  selectedFiltersWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: theme.spacing(2)
  },
  filterChip: {
    marginRight: theme.spacing(),
  },
}));

export default useStyles;
