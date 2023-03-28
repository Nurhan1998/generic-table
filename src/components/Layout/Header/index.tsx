import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { menuItems } from 'configuration/types/menuItems';

import User from 'components/User';


const Header = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleChangeRoute = (url: string) => {
    handleCloseNavMenu();
    router.push(url);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {menuItems.map(({ id, label })=> (
                <MenuItem key={id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map(({ id, label, Icon, url }) => (
              <Button
                key={id}
                onClick={() => handleChangeRoute(url)}
                sx={{ my: 2, color: 'white', display: 'flex' }}
                startIcon={<Icon />}
              >
                {label}
              </Button>
            ))}
          </Box>

          <User />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
