import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Box, CardActionArea, Checkbox, Grid } from '@mui/material';
import { CheckOutlined, Check } from '@mui/icons-material';

import { TCardItemProps } from 'configuration/types/cardItem';
import { flexBetweenCenter } from 'configuration/globalStyles';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const fontStyle = {
  width: 'max-content',
  bgcolor: 'rgba(0,0,0, 0.1)',
  borderRadius: '30px',
  paddingX: '14px',
  paddingY: '7px',
  fontSize: 'small'
};

const CardItem = ({ date, name, title, address, bort, area, cost }: TCardItemProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon onClick={handleExpandClick} />
            </IconButton>
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
        <CardContent>
          <Box sx={flexBetweenCenter} mb={2}>
            <Typography variant="h5" color="text.secondary">
              {title}
            </Typography>
            <div>
              <Checkbox {...label} icon={<Check />} checkedIcon={<CheckOutlined />} />
            </div>
          </Box>
          <Grid container spacing={2} mb={2}>
            <Grid item>
              <Typography sx={fontStyle}>
                Площадь: {area}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={fontStyle}>
                Цена: {cost}c
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={fontStyle}>
                Борт: {bort}
              </Typography>
            </Grid>
          </Grid>
          <Typography>
            {address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
