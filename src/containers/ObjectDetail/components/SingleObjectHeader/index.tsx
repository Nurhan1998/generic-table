import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';

import { ESingleObjectCardStatus } from 'configuration/types/singleObjectCard';
import { flexBetweenCenter } from 'configuration/globalStyles';

const SingleObjectHeader = ({ id, status }: {id?: string, status?: ESingleObjectCardStatus}): JSX.Element => {
  const statusColor = useMemo(() => {
    if(status === ESingleObjectCardStatus.active){
      return {
        bgColor: 'rgba(177,228,97,0.29)',
        color: '#82CC0F',
      };
    }
    return {
      bgColor: 'rgba(177,228,97,0.29)',
      color: '#82CC0F',
    };
  }, [status]);

  return (
    <Box sx={flexBetweenCenter}>
      <Typography>
        Объект: #{id}
      </Typography>
      <Typography sx={{ display: 'flex', alignItems: 'center' }}>
        Статус:
        <Box
          color={statusColor.color}
          sx={{
            backgroundColor: `${statusColor.bgColor}`,
            ml: 2,
            px: 2,
            py: '2px',
          }}
        >
          {status}
        </Box>
      </Typography>
    </Box>
  );
};

export default SingleObjectHeader;
