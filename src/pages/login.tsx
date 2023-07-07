import { useEffect, useState } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { url } from '@/src/lib/api/const';
import { auth } from '@/src/lib/firebase/firebase';
import { useAuthContext } from '../feature/auth/provider/AuthProvider';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const router = useRouter();
  const { userDetails } = useAuthContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetails) {
      router.push('/');
    }
  }, [userDetails]);

  const onLoginSubmit = async (data: any) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() =>
        toast({
          title: 'ログインしました。',
          status: 'success',
          position: 'top',
        })
      )
      .catch((err) => {
        toast({
          title: 'エラーが発生しました。',
          status: 'error',
          position: 'top',
        });
        console.log(err);
      });
    // バックエンドに認証リクエストを送る
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
                <Box borderBottom="solid 1px" w="120px" as="b" color="#3f13e0">
                  <Link href="/register">新規登録はこちらから</Link>
                </Box>
              </form>
            </VStack>
          </Box>
          {/* )} */}
        </Box>
      ) : (
        <Box mt="36vh" textAlign="center">
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

export default Login;
