import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '500px',
        }}
      >
        <Typography variant="h1" color="primary" sx={{ mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
          The page you are looking for might have been removed or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          component={RouterLink}
          to="/"
          size="large"
        >
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
}

export default NotFound;
