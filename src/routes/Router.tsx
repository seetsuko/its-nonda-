import React from 'react';import { Box } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../user/Login';

import { UserEdit } from '../user/UserEdit';
import { Register } from '../user/Register';
import { Header } from '../Header';
import { Counter } from '../pages/Counter';
import { TimeList } from '../pages/TimeList';


export const Router = () => {
  return (
    <Box m={0}>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserEdit />} />
        <Route path="/" element={<Counter />} />
        <Route path="/timelist" element={<TimeList />} />
      </Routes>
    </Box>
  );
};
