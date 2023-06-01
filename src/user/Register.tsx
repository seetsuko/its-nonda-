import React, { useState } from 'react';

import { FormLabel, Input, Button, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useCookies from 'react-cookie/cjs/useCookies';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signIn } from '../redux/authSlice';
import { url } from '../const';
import { useSelector } from '../redux/store';
import { auth } from "../FirebaseConfig";

/* ↓ログインしているかどうかを判定する */

export const Register = () => {
  const uth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: any) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
    } catch(error) {
      alert("正しく入力してください");
    }
  };

  return (
    <div className="main">
      {uth && <Navigate to="/" />}
      <h2> 新規登録</h2>
      <p className="error">{errorMessage}</p>
      <VStack>
        <form onSubmit={handleSubmit(onSubmit)} className="user-form">
          <div>
            <FormLabel htmlFor="email">メールアドレス
            <Input
              id="email"
              placeholder="メールアドレス"
              // バリデーション
              {...register('email', { required: true })}
            /></FormLabel>
            {errors.email && (
              <Text color="red.400">メールアドレスを入力してください</Text>
            )}
          </div>
          <div>
            <FormLabel htmlFor="password">パスワード
            <Input
              type="password"
              id="login-password"
              placeholder="パスワード"
              // バリデーション
              {...register('password', { required: true })}
            /></FormLabel>
            {errors.password && (
              <Text color="red.400">パスワードを入力してください</Text>
            )}
          </div>
          <div>
            <Button mt={4} colorScheme="teal" type="submit">
              登録
            </Button>
          </div>
          <Link to="/login">ログイン画面へ</Link>
        </form>
      </VStack>
    </div>
  );
};
