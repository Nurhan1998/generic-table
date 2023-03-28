import { Box, Container, Grid, Typography } from '@mui/material';

import ObjectHistoryItem from './ObjectHistoryItem';

const historyOfSingleObject = [];


const HistoryOfObject = (): JSX.Element => (
  <Container maxWidth="lg" sx={{ mt: 4 }}>
    <Box my={2}>
      <Typography variant={'h5'} >История оформления договоров</Typography>
    </Box>
    <Grid container spacing={5}>
      {historyOfSingleObject.map(item => (
        <ObjectHistoryItem
          key={item.id}
          id={item.id}
          kindOfItem={item.kindOfItem}
          rentGaveName={item.rentGaveName}
          responsiblePeopleName={item.responsiblePeopleName}
          responsiblePeopleStatus={item.responsiblePeopleStatus}
          img={item.img}
        />
      ))}
    </Grid>
  </Container>
);

export default HistoryOfObject;
