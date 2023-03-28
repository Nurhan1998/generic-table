import { Backdrop, Box, Button, Modal, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { CREATE_USER } from 'configuration/urls';

import Form from 'components/Form';

import { FORM_CREATE_USER_NAME } from 'pages/users/constants';

import { makeSelectFormIsValid } from 'store/forms/selectors';

import { schema } from 'utils/validation/createUser';

import config from './form/config';

type TUserAddNewModalProps = {
  handleClose: () => void;
  open: boolean
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
};

const UserAddNewModal = ({ handleClose, open }: TUserAddNewModalProps): JSX.Element => {
  const fetching = false;

  const isFormValid = useSelector(makeSelectFormIsValid(FORM_CREATE_USER_NAME));

  const router = useRouter();

  const handleSubmit = () => {
    router.push(CREATE_USER);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Paper sx={style}>
        <Typography fontWeight="bold" variant="h6" component="h2">
          Создание пользователя
        </Typography>
        <Typography color="text.secondary">
          Создание пользователя
        </Typography>
        <Box my={3}>
          <Form
            name={FORM_CREATE_USER_NAME}
            config={config}
            validateSchema={schema}
            loading={fetching}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            disabled={!isFormValid}
            onClick={handleSubmit}
            variant="contained"
          >
            Создать пользователя
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UserAddNewModal;
