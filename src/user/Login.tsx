import React, { useEffect, useState } from 'react';
import {
  User,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateCurrentUser,
} from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FormLabel, Input, Button, VStack, Text, Box } from '@chakra-ui/react';
import { auth } from '../FirebaseConfig';
import { url } from '../const';

type UserType = User | null;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    // ↓ログインしているかどうかを判定する
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const onLoginSubmit = async (data: any) => {
    await signInWithEmailAndPassword(auth, data.email, data.password).catch(
      (err) => {
        alert('メールアドレスまたはパスワードが間違っています');
        console.log(err);
      }
    );

    // 認証後Rails側にリクエストを送る
    const authData = getAuth();
    const currentUser = authData.currentUser;
    // Firebase Authの認証
    if (authData && currentUser) {
      const token = await currentUser.getIdToken(true);
      const config = { token };
      // Rails側にリクエストを送る
      try {
        await axios.post(`${url}/auth/registrations`, config);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box>
      {user ? (
        <Navigate to="/" />
      ) : (
        <Box>
          <Text fontSize="xl"> ログイン</Text>
          <VStack>
            <form onSubmit={handleSubmit(onLoginSubmit)} className="user-form">
              <Box>
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
              </Box>
              <Box>
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
              </Box>
              <Box>
                <Button mt={4} colorScheme="teal" type="submit">
                  ログイン
                </Button>
              </Box>
              <Link to="/register">新規登録はこちらから</Link>
            </form>
          </VStack>
        </Box>
      )}
    </Box>
  );
};
