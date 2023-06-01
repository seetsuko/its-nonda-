import React, { useState } from 'react';
import { FormLabel, Input, Button, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useCookies from 'react-cookie/cjs/useCookies';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/authSlice';
import { url } from '../const';
import { useSelector } from '../redux/store';

export const Register = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
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
    let token = '';
    await axios
      .post(`${url}/users`, data)
      .then((res) => {
        console.log(res);
        token = res.data.token;
        setCookie('token', token);
        dispatch(signIn(true));
        navigation('/');
      })
      .catch((err) => {
        setErrorMessage(`ユーザー登録に失敗しました。 ${err}`);
      });
  };

  return (
    <div className="main">
      {auth && <Navigate to="/" />}
      <h2> 新規登録</h2>
      <p className="error">{errorMessage}</p>
      <VStack>
        <form onSubmit={handleSubmit(onSubmit)} className="user-form">
          <div>
            <FormLabel htmlFor="email">メールアドレス</FormLabel>
            <Input
              id="email"
              placeholder="メールアドレス"
              // バリデーション
              {...register('email', { required: true })}
            />
            {errors.email && (
              <Text color="red.400">メールアドレスを入力してください</Text>
            )}
          </div>
          <div>
            <FormLabel htmlFor="password">パスワード</FormLabel>
            <Input
              type="password"
              id="login-password"
              placeholder="パスワード"
              // バリデーション
              {...register('password', { required: true })}
            />
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
