import {useEffect} from 'react';
import {Box, Button, Card, CardActions, CardContent, Container} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';

import {fetchSingleDataRequest} from 'store/objects/actions';
import {makeSelectObjectDetailInfo} from 'store/objects/selectors';

import SingleObjectMainInfo from './components/SingleObjectMainInfo';
import SingleObjectSecondaryInfo from './components/SingleObjectSecondaryInfo';
import HistoryOfObject from './components/HistoryOfObject';
import SingleObjectHeader from './components/SingleObjectHeader';
import {ESingleObjectCardStatus} from "configuration/types/singleObjectCard";

const ObjectDetail = (): JSX.Element => {

  const selectObjectDetailInfo = useSelector(makeSelectObjectDetailInfo);

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const handleReRegister = () => {
    return;
  };

  const prolongation = () => {
    return;
  };

  const handleSubRent = () => {
    return;
  };

  const handleClaimWork = () => {
    return;
  };

  useEffect(() => {
    dispatch(fetchSingleDataRequest({ uuid: `${id}` }));
  }, [router]);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Card sx={{ minWidth: 275, width: '100%' }}>
          <CardContent>
            <SingleObjectHeader id={selectObjectDetailInfo?.id} status={ESingleObjectCardStatus.active} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <SingleObjectMainInfo
                cost={selectObjectDetailInfo?.cost}
                area={selectObjectDetailInfo?.size}
                bord={2}
                dateKP={'20.20.2102'}
                id={selectObjectDetailInfo?.id}
                address={selectObjectDetailInfo?.address}
                dateRent={'20.21.2022'}
                note={selectObjectDetailInfo?.note}
              />
              <SingleObjectSecondaryInfo date={'20.210.2122'} name={selectObjectDetailInfo?.name} />
            </Box>
          </CardContent>
          <CardActions>
            <Button onClick={handleReRegister}>Переоформить</Button>
            <Button onClick={prolongation}>Прологация</Button>
            <Button onClick={handleSubRent}>Субаренда</Button>
            <Button onClick={handleClaimWork}>Претензионная работа</Button>
          </CardActions>
        </Card>
      </Container>
      <HistoryOfObject />
    </>
  );
};

export default ObjectDetail;
