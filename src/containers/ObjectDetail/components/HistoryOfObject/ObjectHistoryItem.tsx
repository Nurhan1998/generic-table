import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import * as React from 'react';

import { TObjectHistoryItemProps } from './types';

const ObjectHistoryItem =
  ({
    kindOfItem,
    img,
    rentGaveName,
    responsiblePeopleName,
    responsiblePeopleStatus
  }: TObjectHistoryItemProps): JSX.Element => (
    <Grid item xs={10} md={6} lg={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={img}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {kindOfItem}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Фио или название арендантора:
            </Typography>
            <Typography>
              {rentGaveName}
            </Typography>
            <Typography>Ответственный</Typography>
            <Card sx={{ maxWidth: 345, boxShadow: 'none' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                title={responsiblePeopleName}
                subheader={responsiblePeopleStatus}
              />
            </Card>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );

export default ObjectHistoryItem;
