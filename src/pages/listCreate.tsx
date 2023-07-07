import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { url } from '@/src/lib/apiPath/const';
import { AuthGuard } from '../feature/auth/component/AuthGuard.tsx/AuthGuard';
import { useAuthContext } from '../feature/auth/provider/AuthProvider';

const ListCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { userDetails } = useAuthContext();

  // console.log(userDetails);

  const onCreateSubmit = async (data: any) => {
    const userId = userDetails?.uid;
    await axios.post(`${url}/users/${userId}/do_lists`, data).then((res) => {
      console.log('作成完了！');
      router.push('/');
    });
  };

  return (
    <AuthGuard>
      <Box textAlign="center" p={50} bg="#fefefe" h="88vh">
        <Box m={3} mb={8} textAlign="center">
          <Text fontSize="xl"> リスト作成</Text>
          <VStack>
            <form onSubmit={handleSubmit(onCreateSubmit)} className="user-form">
              <Box>
                <FormLabel htmlFor="title">
                  リスト名
                  <Input
                    id="title"
                    placeholder="リスト名を入力"
                    {...register('title', { required: true })}
                  />
                </FormLabel>
                {errors.title && (
                  <Text color="red.400">リスト名を入力してください</Text>
                )}
              </Box>
              <Box>
                <Button mt={4} colorScheme="teal" type="submit">
                  作成！
                </Button>
              </Box>
            </form>
          </VStack>
        </Box>
        <Link href="/">
          <Button>戻る</Button>
        </Link>
      </Box>
    </AuthGuard>
  );
};

export default ListCreate;
