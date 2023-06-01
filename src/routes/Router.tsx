import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../user/Login';
import { UserEdit } from '../user/UserEdit';
// import { Counter } from '../pages/Counter';
import { Mypage } from '../user/Mypage';
import { Register } from '../user/Register';

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<UserEdit />} />
      {/* <Route path="/" element={<Counter />} /> */}
      <Route path="/" element={<Mypage />} />
    </Routes>
  );
};
