import React from 'react';
import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Login } from '../user/Login';
import { Register } from '../user/Register';
import { Header } from '../Header';
import { Counter } from '../pages/Counter';
import { TimeLog } from '../pages/TimeLog';
import { ListCreate } from '../pages/ListCreate';
import { ListEdit } from '../pages/ListEdit';

export const Router = () => {
  return (
    <Box m={0} w="100vw" h="100vh">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Counter />} />
        <Route path="/time_list/:listId" element={<TimeLog />} />
        <Route path="/list_create" element={<ListCreate />} />
        <Route path="/list/:listId/edit" element={<ListEdit />} />
      </Routes>
    </Box>
  );
};
