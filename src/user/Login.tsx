import React, { useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormLabel, Input, Button, VStack, Text } from '@chakra-ui/react';
import useCookies from 'react-cookie/cjs/useCookies';
import { auth } from '../FirebaseConfig';

type UserType = User | null;

export const Login = () => {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      alert('メールアドレスまたはパスワードが間違っています');
    }
  };

  return (
    <div className="main">
      {user ? (
        <Navigate to="/" />
      ) : (
        <div>
          <h2> ログイン</h2>
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
                  ログイン
                </Button>
              </div>
              <Link to="/register">新規登録</Link>
            </form>
          </VStack>
        </div>
      )}
    </div>
  );
};
