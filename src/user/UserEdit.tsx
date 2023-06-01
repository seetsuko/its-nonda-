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
    // アイコンPOST
    if (file !== '') {
      formData.append('icon', file);
      await axios
        .post(`${url}/uploads`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${cookie.token}`,
          },
        })
        .then((res) => {
          console.log(res);
        });
    }
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
