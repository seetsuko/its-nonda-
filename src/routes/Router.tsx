import React from 'react';
import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Login } from '../user/Login';
import { Register } from '../user/Register';
import { Header } from '../Header';
import { Counter } from '../pages/Counter';
import { TimeLog } from '../pages/TimeLog';

export const Router = () => {
  return (
    <Box m={0}>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Counter />} />
        <Route path="/timelist" element={<TimeLog />} />
      </Routes>
    </Box>
  );
};
