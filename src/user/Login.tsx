import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FormLabel, Input, Button, VStack, Text } from '@chakra-ui/react';
import useCookies from 'react-cookie/cjs/useCookies';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/authSlice';
import { url } from '../const';
import { useSelector } from '../redux/store';

export const Login = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cookie, setCookie, remouveCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data: any) => {
    console.log(data);
    //   ユーザー認証APIを使って、ログイン画面を作成する
    axios
      .post(`${url}/signin`, data)
      .then((res) => {
        console.log(res.data.token);
        setCookie('token', res.data.token);
        dispatch(signIn(true));
        // UserHomeページへ遷移
        navigation('/');
      })
      // エラー時のUIも実装するようにしましょう
      .catch((err) => {
        setErrorMessage(`ログインに失敗しました。${err}`);
      });
  };

  return (
    <div className="main">
      {auth && <Navigate to="/" />}
      <h2> ログイン</h2>
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
              ログイン
            </Button>
          </div>
          {/* ユーザー作成画面へのリンクを配置する */}
          <Link to="/signup">ユーザー新規登録</Link>
        </form>
      </VStack>
    </div>
  );
};
