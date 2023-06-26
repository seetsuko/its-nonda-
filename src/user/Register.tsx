import React, { useContext, useEffect, useState } from 'react';
import { FormLabel, Input, Button, VStack, Text, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { url } from '../const';
import { LoginStatusContext } from '../App';

export const Register = () => {
  const { loading, token } = useContext(LoginStatusContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ログインしているかどうかを判定する
  const login = token !== '';

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
      const tokenData = await currentUser.getIdToken(true);
      const config = { tokenData };
      // Rails側にリクエストを送る
      try {
        await axios.post(`${url}/auth/users`, config);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box>
      {!loading && (
        <Box textAlign="center" p={50} bg="#fefefe" h="88vh">
          {login ? (
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
                        placeholder="メールアドレスを入力"
                        // バリデーション
                        {...register('email', { required: true })}
                      />
                    </FormLabel>
                    {errors.email && (
                      <Text color="red.400">
                        メールアドレスを入力してください
                      </Text>
                    )}
                  </Box>
                  <Box>
                    <FormLabel htmlFor="password">
                      パスワード
                      <Input
                        type="password"
                        id="login-password"
                        placeholder="パスワードを入力"
                        // バリデーション
                        {...register('password', { required: true })}
                      />
                    </FormLabel>
                    {errors.password && (
                      <Text color="red.400">パスワードを入力してください</Text>
                    )}
                  </Box>
                  <Box>
                    <Button mt={4} mb={5} colorScheme="teal" type="submit">
                      登録
                    </Button>
                  </Box>
                  <Box
                    borderBottom="solid 1px"
                    w="120px"
                    as="b"
                    color="#3f13e0"
                  >
                    <Link to="/login">ログイン画面へ</Link>
                  </Box>
                </form>
              </VStack>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
