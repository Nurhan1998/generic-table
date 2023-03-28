import { Box, Button, Container, Paper } from '@mui/material';
import { useRouter } from 'next/router';

import Form from 'components/Form';

import { ORDER_CREATE_FORM_NAME } from 'containers/OrderCreate/form/config';

import { schemaCreateOrder } from 'utils/validation/createOrder';

import config from './form/config';
import useStyles from './style';

const OrderCreate = (): JSX.Element => {
  const { classes } = useStyles();
  const router = useRouter();
  const handleSubmit = () => {
    return;
  };

  const handleBack = () => {
    router.back();
  };

  return(
    <Container maxWidth="lg">
      <Paper>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            py: 4,
            px: 4,
          }}
        >
          <Form
            name={ORDER_CREATE_FORM_NAME}
            config={config}
            className={classes.form}
            validateSchema={schemaCreateOrder}
          />
          <Box
            sx={theme => ({
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              mt: 4,
              gap: theme.spacing(2),
            })}
          >
            <Button onClick={handleBack}>Назад</Button>
            <Button variant="contained" type="submit" onClick={handleSubmit}>Добавить</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderCreate;
