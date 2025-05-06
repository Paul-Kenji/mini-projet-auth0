import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bienvenue sur mon projet Next.js !
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          marginTop: 4,
          flexDirection: 'row',
        }}
      >
        <Button variant="contained" color="primary">
         inscrire
        </Button>
        <Button variant="outlined" color="secondary">
          Connexion
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
