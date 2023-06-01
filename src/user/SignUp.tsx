import React, { useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useCookies from 'react-cookie/cjs/useCookies';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/authSlice';
import { url } from '../const';
import { useSelector } from '../redux/store';

export const SignUp = () => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">
            ユーザー名
            <input
              id="signup-name"
              // バリデーション
              {...register('name', { required: true })}
            />
          </label>
          {errors.name && (
            <div className="error">ユーザー名を入力してください</div>
          )}
        </div>
        <div>
          <label htmlFor="email">
            メールアドレス
            <input
              id="signup-email"
              // バリデーション
              {...register('email', { required: true })}
            />
          </label>
          {errors.email && (
            <div className="error">メールアドレスを入力してください</div>
          )}
        </div>
        <div>
          <label htmlFor="password">
            パスワード
            <input
              type="password"
              id="signup-password"
              // バリデーション
              {...register('password', { required: true })}
            />
          </label>
          {errors.password && (
            <div className="error">パスワードを入力してください</div>
          )}
        </div>
        <div>
          <button id="signup-submit" type="submit">
            登録
          </button>
        </div>
      </form>
      {/* ログイン画面へのリンクを配置する */}
      <Link to="/login">ログイン画面へ</Link>
    </div>
  );
};
