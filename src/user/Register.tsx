import React, { useEffect, useState } from 'react';

import { FormLabel, Input, Button, VStack, Text } from '@chakra-ui/react';
import type { User } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../FirebaseConfig';

type UserType = User | null;

export const Register = () => {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<UserType>(null);

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      navigation('/');
    });
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigation('/');
    } catch (error) {
      alert('正しく入力してください');
    }
  };

  return (
    <div className="main">
      {user ? (
        <Navigate to="/" />
      ) : (
        <div>
          <h2> 新規登録</h2>
          <p className="error">{errorMessage}</p>
          <VStack>
            <form onSubmit={handleSubmit(onSubmit)} className="user-form">
              <div>
                <FormLabel htmlFor="email">
                  メールアドレス
                  <Input
                    id="email"
                    placeholder="メールアドレス"
                    // バリデーション
                    {...register('email', { required: true })}
                  />
                </FormLabel>
                {errors.email && (
                  <Text color="red.400">メールアドレスを入力してください</Text>
                )}
              </div>
              <div>
                <FormLabel htmlFor="password">
                  パスワード
                  <Input
                    type="password"
                    id="login-password"
                    placeholder="パスワード"
                    // バリデーション
                    {...register('password', { required: true })}
                  />
                </FormLabel>
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
      )}
    </div>
  );
};
