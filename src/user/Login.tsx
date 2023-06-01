import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

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

  const onSubmit = (data:any) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <div>
          <label htmlFor="email">メールアドレス
          <input
            id="login-email"
            // バリデーション
            {...register('email', { required: true })}
          /></label>
          {errors.email && (
            <div className="error">メールアドレスを入力してください</div>
          )}
        </div>
        <div>
          <label htmlFor="password">パスワード
          <input
            type="password"
            id="login-password"
            // バリデーション
            {...register('password', { required: true })}
          /></label>
          {errors.password && (
            <div className="error">パスワードを入力してください</div>
          )}
        </div>
        <div>
          <button id="submit" type="submit">
            ログイン
          </button>
        </div>
        {/* ユーザー作成画面へのリンクを配置する */}
        <Link to="/signup">ユーザー新規登録</Link>
      </form>
    </div>
  );
};
