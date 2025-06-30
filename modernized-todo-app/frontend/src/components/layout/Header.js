import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TaskIcon from '@mui/icons-material/Task';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ borderBottom: '3px solid #ffbf00', borderRadius: '0px' }}>
        <Toolbar sx={{ minHeight: '80px', px: 3 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleMenuItemClick('/')}>Dashboard</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/users')}>Users</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/tasks')}>Tasks</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/tasks/by-user')}>Tasks by User</MenuItem>
          </Menu>
          
          <TaskIcon sx={{ mr: 1, color: '#fc8001' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <RouterLink to="/" style={{ color: '#ffbf00', textDecoration: 'none', fontWeight: 600 }}>
              DoIT Compass
            </RouterLink>
          </Typography>
          
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/users"
            sx={{ mx: 1, px: 2, py: 1, fontSize: '1rem', fontWeight: 500 }}
          >
            Users
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/tasks"
            sx={{ mx: 1, px: 2, py: 1, fontSize: '1rem', fontWeight: 500 }}
          >
            Tasks
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/tasks/by-user"
            sx={{ mx: 1, px: 2, py: 1, fontSize: '1rem', fontWeight: 500 }}
          >
            Tasks by User
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
