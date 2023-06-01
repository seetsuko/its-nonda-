import React,{ useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Compressor from 'compressorjs';
import { url } from '../const';

export const UserEdit = () => {
  const formData = new FormData();
  const navigation = useNavigate();
  const [cookie] = useCookies();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ユーザ表示用API
  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        reset({ name: res.data.name });
        setPreview(res.data.iconUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const onSubmit = async (data:any) => {
    // ユーザ名更新用API
    await axios
      .put(`${url}/users`, data, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        // UserHomeページへ遷移
        navigation('/');
      })
      .catch((err) => {
        setErrorMessage(`ユーザ情報編集に失敗しました。${err}`);
      });
  };

  return (
    <div>
      <h2>ユーザー編集</h2>
      <p>{errorMessage}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='user'>ユーザ名
        <input type="text" {...register('name', { required: true })} />
        </label>
        {errors.name && <div>ユーザー名を入力してください</div>}
        <div>
          <button type="submit">登録</button>
        </div>
      </form>
    </div>
  );
};
