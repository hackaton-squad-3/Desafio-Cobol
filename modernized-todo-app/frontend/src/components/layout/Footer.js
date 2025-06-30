import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        DoIT Compass
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 4,
        backgroundColor: '#000000',
        color: '#ffffff',
        borderTop: '3px solid #ffbf00',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center" sx={{ mb: 1, fontWeight: 500 }}>
          Modernized Todo Application (COBOL to Java/React)
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;
