import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import isEqual from 'lodash/isEqual';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import FilterList from '@mui/icons-material/FilterList';
import FilterAlt from '@mui/icons-material/FilterAlt';
import Close from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';

import SearchInput from 'components/SearchInput';
import Form from 'components/Form';

import { makeSelectHasPermission } from 'store/auth/selectors';
import { ITableItem } from 'store/table/types';
import { initTable, removeTable, setTablePage, setTablePageSize, setTableSearch } from 'store/table/actions';
import {
  makeSelectTableData,
  makeSelectTableLoading,
  makeSelectTablePage,
  makeSelectTablePageSize,
  makeSelectTableTotalCount,
  makeSelectTableSearch,
} from 'store/table/selectors';
import { EPermissionAction } from 'store/auth/types';
import { removeForm, setFormValue, initForm } from 'store/forms/actions';
import { makeSelectFormValuesAsFilterChips, makeSelectFormLoading } from 'store/forms/selectors';

import { getQueryAsObject } from 'utils/urls';

import Empty from './components/Empty';
import Loading from './components/Loading';
import Actions from './components/Actions';
import {
  DEFAULT_FIRST_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SEARCH_QUERY_KEY,
  FILTERS_FORM_NAME_POSTFIX
} from './constants';
import { ITableProps } from './types';
import useStyles from './styles';


const Table = <T extends ITableItem>(props: ITableProps<T>): JSX.Element => {
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLButtonElement | undefined>();
  const dispatch = useDispatch();
  const router = useRouter();
  const query = getQueryAsObject();
  const { replace } = router;
  const { classes } = useStyles();
  const {
    name,
    normalize,
    columns,
    fetchAction,
    filterConfig = [],
    permissionKey,
    reflectQuery = true,
    disableSearch = false,
    searchQueryKey = DEFAULT_SEARCH_QUERY_KEY,
    handleCreateClick,
  } = props;

  const filterFormName = `${name}${FILTERS_FORM_NAME_POSTFIX}`;

  const search = useSelector(makeSelectTableSearch(name));
  const loading = useSelector(makeSelectTableLoading(name));
  const data = useSelector(makeSelectTableData<T>(name));
  const page = useSelector(makeSelectTablePage(name));
  const pageSize = useSelector(makeSelectTablePageSize(name));
  const totalCount = useSelector(makeSelectTableTotalCount(name));
  const hasActionColumn = useSelector(makeSelectHasPermission(permissionKey));
  const hasAddPermission = useSelector(makeSelectHasPermission(permissionKey, EPermissionAction.ADD));
  const selectedFilters = useSelector(makeSelectFormValuesAsFilterChips(name));
  const formLoading = useSelector(makeSelectFormLoading(filterFormName));

  const columnsLength = useMemo(
    () => {
      if (hasActionColumn) return columns.length + 1;
      return columns.length;
    },
    [hasActionColumn, columns],
  );

  const normalizedData = useMemo(
    () => data.map(normalize),
    [data, normalize],
  );

  const tableBody = useMemo(
    () => {
      if (loading) return <Loading columnLength={columnsLength} />;
      if (!normalizedData.length) return <Empty colSpan={columnsLength} />;
      return normalizedData.map((rowColumns, rowIdx) => (
        <TableRow key={rowIdx}>
          {rowColumns.map((column, columnIdx) => (
            <TableCell key={columnIdx}>
              {column}
            </TableCell>
          ))}
          {hasActionColumn && (
            <Actions
              permission={permissionKey}
            />
          )}
        </TableRow>
      ));
    },
    [normalizedData, loading, columnsLength, hasActionColumn, permissionKey],
  );

  const handlePageChange = (_: MouseEvent<HTMLButtonElement> | null, page: number): void => {
    dispatch(setTablePage({ name, value: page }));
  };

  const handlePageSizeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    dispatch(setTablePageSize({
      name,
      value: e.target.value
        ? Number(e.target.value)
        : DEFAULT_PAGE_SIZE
    }));
  };

  const handleOpenFilters = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setFilterAnchorEl(e.currentTarget);
  };

  const handleFiltersClose = (): void => {
    setFilterAnchorEl(undefined);
  };

  const handleAddClick = () => {
    if(typeof handleCreateClick === 'function'){
      handleCreateClick();
    }
  };

  const handleFilterRemove = (fieldName: string) => (): void => {
    dispatch(setFormValue({ form: filterFormName, field: fieldName, value: '' }));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setTableSearch({ name, value: e.target.value }));
  };

  useEffect(
    () => {
      if (reflectQuery) {
        const params: Record<string, string> = {};

        if (totalCount > pageSize) {
          params.page = page.toString();
          params.pageSize = pageSize.toString();
        }

        for (const filter of selectedFilters) {
          params[filter.fieldName] = filter.value;
        }

        if (search) {
          params[searchQueryKey] = search;
        }

        if (Object.keys(params).length && !isEqual(query, params) && !formLoading) {
          replace({ query: params }).catch();
        }
      }
    },
    // Call this effect only when those vars changed
    // eslint-disable-next-line
    [selectedFilters, page, pageSize, query, totalCount, formLoading],
  );

  useEffect(
    () => {
      dispatch(initTable({
        name,
        _meta: {
          filterConfig,
          fetchAction,
        },
        pagination: !reflectQuery ? undefined : {
          page: query.page ? Number(query.page) : DEFAULT_FIRST_PAGE,
          pageSize: query.pageSize ? Number(query.pageSize) : DEFAULT_PAGE_SIZE,
          totalCount: 0
        }
      }));
      dispatch(initForm({
        form: filterFormName,
        config: filterConfig,
        initials: query,
      }));

      if (reflectQuery && searchQueryKey in query) {
        dispatch(setTableSearch({ name, value: query[searchQueryKey] as string }));
      }

      return () => {
        dispatch(removeForm({ form: filterFormName }));
        dispatch(removeTable({ name }));
      };
    },
    // Need to call this effect only once at render
    // eslint-disable-next-line
    [],
  );

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Toolbar>
          {
            disableSearch ? <div /> : (
              <SearchInput
                value={search}
                onChange={handleSearchChange}
              />
            )
          }
          <div className={classes.leftSideToolbar}>
            <IconButton
              color="primary"
              onClick={handleOpenFilters}
            >
              <FilterList />
            </IconButton>
            {
              hasAddPermission && (
                <Button onClick={handleAddClick} variant="contained" color="primary">
                  Добавить
                </Button>
              )
            }
          </div>
        </Toolbar>
        {Boolean(selectedFilters.length) && (
          <Toolbar>
            {selectedFilters.map((item, idx) => (
              <Chip
                key={idx}
                icon={<FilterAlt />}
                label={`${item.displayName}: ${item.displayValue}`}
                className={classes.filterChip}
                onDelete={handleFilterRemove(item.fieldName)}
              />
            ))}
          </Toolbar>
        )}

        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((item, idx) => (
                <TableCell key={idx}>
                  {item.label}
                </TableCell>
              ))}
              {hasActionColumn && (
                <TableCell>
                  Действия
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBody}
          </TableBody>
        </MuiTable>

        {
          totalCount >= pageSize && (
            <div className={classes.paginationWrapper}>
              <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handlePageSizeChange}
                rowsPerPage={pageSize}
                rowsPerPageOptions={[10, 20, 50, 100]}
              />
            </div>
          )
        }
      </TableContainer>

      <Popover
        id={filterFormName}
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleFiltersClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.formWrapper}>
          <div className={classes.filtersHeaderWrapper}>
            <Typography variant="h5" className={classes.filtersHeader}>Фильтры <FilterList /></Typography>
            <IconButton onClick={handleFiltersClose}>
              <Close />
            </IconButton>
          </div>
          <Form
            name={filterFormName}
            config={filterConfig}
            className={classes.filtersForm}
            outsideInitialization
          />
        </div>
      </Popover>
    </Paper>
  );
};

export default Table;
