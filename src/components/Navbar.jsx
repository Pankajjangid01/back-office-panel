import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #ff416c, #ff4b2b)', 
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            fontFamily: 'Poppins',
            letterSpacing: '1.5px',
            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)',
          }}
        >
          Back Office Panel
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/users"
          sx={{
            margin: '0 10px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#ff416c',
              color: '#fff',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease',
            },
          }}
        >
          Users
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/task-lists"
          sx={{
            margin: '0 10px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#ff416c',
              color: '#fff',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease',
            },
          }}
        >
          Task Lists
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/tasks"
          sx={{
            margin: '0 10px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#ff416c',
              color: '#fff',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease',
            },
          }}
        >
          Tasks
        </Button>
        <Button
          color="inherit"
          onClick={onLogout}
          sx={{
            margin: '0 10px',
            fontWeight: 'bold',
            backgroundColor: '#ff4b2b',
            color: '#fff',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: '#ff416c',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease',
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
