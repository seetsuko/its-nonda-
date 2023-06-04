import React from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from './Header';
import { Router } from './routes/Router';

const App = () => {
  return (
    <Box textAlign="center">
      <Router />
    </Box>
  );
};

export default App;
