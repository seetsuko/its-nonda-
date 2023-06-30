import React, { useContext, useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Box,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { auth } from '../FirebaseConfig';
import { url } from '../const';
import { LoginStatusContext } from '../App';

export const Login = () => {
  const { loading, setLoading, token } = useContext(LoginStatusContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = token !== '';
  // console.log(loading)

  const onLoginSubmit = async (data: any) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, data.email, data.password).catch(
      (err) => {
        alert('メールアドレスまたはパスワードが間違っています');
        console.log(err);
      }
    );

    // 認証後バックエンドにリクエストを送る
    const authData = getAuth();
    const currentUser = authData.currentUser;
    if (authData && currentUser) {
      const tokenData = await currentUser.getIdToken(true);
      const config = { tokenData };
      try {
        await axios
          .post(`${url}/auth/users`, config)
          .then((res) => console.log(res));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGuestLogin = (e: any) => {
    setLoading(true);
    const data = { email: 'guest@email.com', password: 'guestlogin' };
    signInWithEmailAndPassword(auth, data.email, data.password).catch((err) => {
      alert('メールアドレスまたはパスワードが間違っています');
      console.log(err);
    });
  };

  return (
    <Box>
      {!loading ? (
        <Box textAlign="center" p={50} bg="#fefefe" h="88vh">
          {login ? (
            <Navigate to="/" />
          ) : (
            <Box>
              <Text fontSize="xl"> ログイン</Text>
              <VStack>
                <form
                  onSubmit={handleSubmit(onLoginSubmit)}
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
                  <VStack>
                    <Flex>
                      <Button
                        mt={4}
                        mb={5}
                        mr={2}
                        colorScheme="teal"
                        type="submit"
                      >
                        ログイン
                      </Button>
                      <Button
                        mt={4}
                        mb={5}
                        colorScheme="teal"
                        type="button"
                        onClick={(e) => handleGuestLogin(e)}
                      >
                        ゲストログイン
                      </Button>
                    </Flex>
                  </VStack>
                  <Box
                    borderBottom="solid 1px"
                    w="120px"
                    as="b"
                    color="#3f13e0"
                  >
                    <Link to="/register">新規登録はこちらから</Link>
                  </Box>
                </form>
              </VStack>
            </Box>
          )}
        </Box>
      ) : (
        <Box mt="36vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      )}
    </Box>
  );
};
