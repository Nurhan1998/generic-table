import { useState, useEffect, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { makeSelectProfileInfo } from 'store/auth/selectors';
import { getProfileInfoRequest } from 'store/auth/actions';

import { getProfileMenu } from './menu';

const User = (): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const settings = getProfileMenu(dispatch, router);
  const profile = useSelector(makeSelectProfileInfo);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    if (!profile) return;
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (onClick?: () => void) => (): void => {
    if (typeof onClick === 'function') {
      onClick();
    }
    handleCloseUserMenu();
  };

  useEffect(
    () => {
      if (!profile) {
        dispatch(getProfileInfoRequest());
      }
    },
    // Need to call this effect only once at render
    // eslint-disable-next-line
    [],
  );

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Открыть меню">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {
            profile
              ? (
                profile.avatar
                  ? <Avatar alt={profile.email} src={profile.avatar} />
                  : (
                    <Avatar>
                      {profile.email[0].toUpperCase()}
                    </Avatar>
                  )
              )
              : (
                <CircularProgress style={{ color: '#fff' }} />
              )
          }
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting, idx) => (
          <MenuItem key={`PROFILE_MENU_${idx}`} onClick={handleSettingClick(setting.onClick)}>
            <Typography textAlign="center">{setting.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default User;
