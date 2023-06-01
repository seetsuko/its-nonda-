import React,{ useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Compressor from 'compressorjs';
import useCookies from 'react-cookie/cjs/useCookies';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../redux/authSlice';
import { url } from '../const';

export const SignUp = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const formData = new FormData();
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState(
    'https://4.bp.blogspot.com/-xz7m7yMI-CI/U1T3vVaFfZI/AAAAAAAAfWI/TOJPmuapl-c/s800/figure_standing.png'
  );
  const [cookie, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState('');

  // 画像を圧縮して確認できるようにする
  const handleIconChange = (e) => {
    new Compressor(e.target.files[0], {
      qualty: 0.6,
      success(result) {
        console.log(result);
        setFile(result);
        // プレビュー
        const imageUrl = URL.createObjectURL(result);
        setPreview(imageUrl);
      },
    });
  };

  const onSubmit = async (data) => {
    let token = '';
    // ユーザー情報をpost
    await axios
      .post(`${url}/users`, data)
      .then((res) => {
        console.log(res);
        token = res.data.token;
        setCookie('token', token);
      })
      .catch((err) => {
        setErrorMessage(`ユーザー登録に失敗しました。 ${err}`);
      });
    // アイコンPOST
    formData.append('icon', file);
    await axios
      .post(`${url}/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(signIn());
        // UserHomeページへ遷移
        navigation('/');
      })
      .catch((err) => {
        setErrorMessage(`アイコン登録に失敗しました。 ${err}`);
      });
  };

  return (
    <div className="main">
      {auth && <Navigate to="/" />}
      <h2> 新規登録</h2>
      <p className="error">{errorMessage}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        {/* ユーザアイコンも登録できるようにする */}
        <div>
          <div>
            {/* アイコン画像の確認 */}
            <img alt="アイコン画像" src={preview} className="icon" />
          </div>
          <input
            type="file"
            accept="image/png, image/jpg"
            onChange={handleIconChange}
          />
        </div>
        <div>
          <label htmlFor="name">ユーザー名
          <input
            id="signup-name"
            // バリデーション
            {...register('name', { required: true })}
          /></label>
          {errors.name && (
            <div className="error">ユーザー名を入力してください</div>
          )}
        </div>
        <div>
          <label htmlFor="email">メールアドレス
          <input
            id="signup-email"
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
            id="signup-password"
            // バリデーション
            {...register('password', { required: true })}
          /></label>
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
