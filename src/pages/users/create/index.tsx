import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useRouter } from 'next/router';

import { flexBetweenCenter, flexCenter } from 'configuration/globalStyles';

const UserCreate = (): JSX.Element => {
  const router = useRouter();

  const handleSubmit = () => {
    return;
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Container maxWidth="lg">
      <Typography component="h6" variant="h6" my={4} fontWeight="bold" color="text.secondary">
        Создание пользователя
      </Typography>
      <Paper sx={{ ...flexBetweenCenter, padding: 4 }}>
        <Box sx={{ flex: 0.3, ...flexCenter, flexDirection: 'column' }}>
          <Avatar sx={{ mb: 4, width: '200px', height: '200px', bgcolor: '#BBDEFB', color: '#2196F3' }}>
          </Avatar>
          <Button variant="contained" endIcon={<CloudDownloadIcon />} >Выбрать изображение</Button>
        </Box>
        <Box
          sx={{
            flex: 0.6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '250px'
          }}
        >
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth label="Фамилия" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Имя" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Должность" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Email" variant="outlined" />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleBack} sx={{ mr: 4 }}>Назад</Button>
            <Button onClick={handleSubmit} variant="contained">Сохранить</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserCreate;
