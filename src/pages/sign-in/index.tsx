import {
  Box,
  Container,
  Typography,
  LinearProgress,
  Paper,
  FormControlLabel,
  Button,
  Switch,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { flexBetweenCenter } from 'configuration/globalStyles';

import Form from 'components/Form';

import { signInRequest } from 'store/auth/actions';
import { makeSelectSignInFetching } from 'store/auth/selectors';
import { makeSelectFormValues, makeSelectFormIsValid } from 'store/forms/selectors';

import { schema } from 'utils/validation/signIn';
import safeGet from 'utils/safeGet';

import config from './form/config';
import { FORM_NAME } from './constants';
import useStyles from './styles';


const SignInPage = (): JSX.Element => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const fetching = useSelector(makeSelectSignInFetching);
  const formValues = useSelector(makeSelectFormValues(FORM_NAME));
  const isFormValid = useSelector(makeSelectFormIsValid(FORM_NAME));

  const submit = () => {
    dispatch(signInRequest({
      email: safeGet(formValues, 'email', ''),
      password: safeGet(formValues, 'password', ''),
    }));
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ py: 16 }}>
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
          <Typography component="h1" variant="h6">
            Войдите в свой аккаунт
          </Typography>
          <Typography fontSize={14} color={'gray'}>
            Введите логин и пароль
          </Typography>
          <Form
            name={FORM_NAME}
            config={config}
            className={classes.form}
            validateSchema={schema}
            loading={fetching}
          />
          <Box sx={{ ...flexBetweenCenter, width: '100%', mt: 2 }}>
            <FormControlLabel control={<Switch defaultChecked />} label="Запомнить?" />
            <Button
              type="submit"
              variant="contained"
              onClick={submit}
              disabled={!isFormValid || fetching}
            >
              {fetching ? 'Загрузка...' : 'Войти'}
            </Button>
          </Box>
        </Box>

        {fetching && <LinearProgress />}
      </Paper>
    </Container>
  );
};

export default SignInPage;
