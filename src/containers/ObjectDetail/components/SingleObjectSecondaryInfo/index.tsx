import { Box, Card, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { red, blue } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';

type TSingleObjectMainInfo = {
  name?: string;
  date?: string;
}

const SingleObjectSecondaryInfo = ({ name, date }: TSingleObjectMainInfo): JSX.Element => {

  return (
    <Box sx={{ flex: 0.28 }}>
      <Typography>Арендатор</Typography>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            ИП
          </Avatar>
        }
        title={name}
      />
      <Typography>Ответственный</Typography>
      <Card sx={{ maxWidth: 345, boxShadow: 'none' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={name}
          subheader={date}
        />
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
      </Card>
    </Box>
  );
};

export default SingleObjectSecondaryInfo;
