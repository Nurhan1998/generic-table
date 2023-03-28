import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

type TSingleObjectMainInfo = {
  id?: string;
  address?: string;
  bord?: number;
  area?: string;
  cost?: string;
  dateRent?: string;
  dateKP?: string;
  note?: string;
}

const SingleObjectMainInfo =
  ({
    id,
    address,
    area,
    cost,
    bord,
    dateRent,
    dateKP,
    note,
  }: TSingleObjectMainInfo): JSX.Element => {
    const handleEdit = () => {
      return;
    };

    return (
      <Box sx={{ flex: 0.65 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography fontSize={20} mr={2}>Объект #{id}</Typography>
          <IconButton onClick={handleEdit}>
            <EditRoundedIcon />
          </IconButton>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography color={'text.secondary'} mb={1} >Об объекте</Typography>
          <Grid container>
            <Grid item xs={4}>
              <Typography>Адрес</Typography>
              <Typography color={'text.secondary'}>{address}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Борт</Typography>
              <Typography color={'text.secondary'}>{bord}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Площадь</Typography>
              <Typography color={'text.secondary'}>{area}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography color={'text.secondary'} mb={1}>Об арендаторе</Typography>
          <Grid container>
            <Grid item xs={4}>
              <Typography>Арендная плата</Typography>
              <Typography color={'text.secondary'}>{cost}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Дата договора аренды</Typography>
              <Typography color={'text.secondary'}>{dateRent}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Дата договора КП</Typography>
              <Typography color={'text.secondary'}>{dateKP}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography>Примечание</Typography>
          <Typography mt={2} color={'text.secondary'}>
            {note}
          </Typography>
        </Box>

      </Box>
    );
  };

export default SingleObjectMainInfo;
