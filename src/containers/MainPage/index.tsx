import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container, Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import { HomeBackgroundImage } from 'assets/images/HomeBackgroundImage';
import { SearchNotFound } from 'assets/images/SearchNotFound';

import CardItem from 'components/CardItem';
import Form from 'components/Form';

import { fetchSearchObjectsRequest } from 'store/objects/actions';
import { makeSelectSearchObjectsInfo, makeSelectSearchObjectsLoading } from 'store/objects/selectors';
import { makeSelectFormValues } from 'store/forms/selectors';

import safeGet from 'utils/safeGet';

import config from './form/config';


const FORM_NAME = 'searchMainPage';

export const MainPage = (): JSX.Element => {
  const selectSearchedItems = useSelector(makeSelectSearchObjectsInfo);
  const selectSearchLoading = useSelector(makeSelectSearchObjectsLoading);
  const formValues = useSelector(makeSelectFormValues(FORM_NAME));

  const searchInputValue = safeGet(formValues, 'search', '');

  const dispatch = useDispatch();

  useEffect(() => {
    if(searchInputValue){
      dispatch(fetchSearchObjectsRequest( { params: { search: searchInputValue } } ));
    }
    // eslint-disable-next-line
  }, [searchInputValue]);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* TODO: Нужно нормально сделать тут импутку и отображение компонентов (response), а так saga готова */}
      <Form
        name={FORM_NAME}
        config={config}
      />
      <TextField
        fullWidth
        label="Введите идентификатор или фамилию...."
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
          style: {
            backgroundColor: 'white',
          }
        }}
      />

      {searchInputValue && selectSearchedItems && !selectSearchLoading && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h5">Результаты поиска:</Typography>
          <Grid container spacing={2}>
            {selectSearchedItems.map(item => (
              <Grid key={item.id} item xs={12} lg={4} md={6}>
                <CardItem
                  id={item.id}
                  name={item.name}
                  date={item.container_number || ''}
                  title={item.name}
                  address={item.address}
                  bort={0}
                  area={item.area_type}
                  cost={item.cost}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {!searchInputValue && !selectSearchLoading && (
        <Stack
          direction="column"
          spacing={4}
          alignItems="center"
          my={4}
        >
          <HomeBackgroundImage/>
          <Typography>
            Здесь будут отображены результаты поисков
          </Typography>
        </Stack>
      )}
      {searchInputValue && !selectSearchedItems && (
        <Stack
          direction="column"
          spacing={4}
          alignItems="center"
          my={4}
        >
          <SearchNotFound/>
          <Typography>
            Ничего не найдено
          </Typography>
        </Stack>
      )}
      {selectSearchLoading && (
        <div>loading</div>
      )}
    </Container>
  );
};

export default MainPage;
