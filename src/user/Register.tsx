import React, { useEffect, useState } from 'react';
import { FormLabel, Input, Button, VStack, Text, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  getAuth,
} from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { url } from '../const';

type UserType = User | null;

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState<UserType>(null);

  // ログインしているかどうかを判定する
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleRegisterSubmit = async (data: any) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password).catch(
      (err) => {
        alert('正しく入力してください');
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
          <Text fontSize="xl">新規登録</Text>
          <VStack>
            <form
              onSubmit={handleSubmit(handleRegisterSubmit)}
              className="user-form"
            >
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
                  登録
                </Button>
              </Box>
              <Link to="/login">ログイン画面へ</Link>
            </form>
          </VStack>
        </Box>
      )}
    </Box>
  );
};
