import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthGuard } from '@/src/feature/auth/component/AuthGuard.tsx/AuthGuard';
import { url } from '@/src/lib/apiPath/const';
import type { NextPage } from 'next';

const ListEdit: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const { listId } = router.query;
  const listTitle = router.query.title;
  // console.log(listId);
  // console.log(listTitle);

  const onEditList = async (data: any) => {
    await axios.put(`${url}/do_lists/${listId}`, data).then((res) => {
      console.log(res);
      router.push('/');
    });
  };

  const onDeleteList = () => {
    if (window.confirm('削除しますか？')) {
      axios.delete(`${url}/do_lists/${listId}`).then((res) => {
        console.log('削除完了');
        router.push('/');
      });
    }
  };

  return (
    <AuthGuard>
      <Box textAlign="center" p={50} bg="#fefefe" h="88vh">
        <Box m={3} mb={8} textAlign="center">
          <Text fontSize="xl"> リスト編集</Text>
          <VStack>
            <form onSubmit={handleSubmit(onEditList)} className="user-form">
              <Box>
                <FormLabel htmlFor="title">
                  リスト名
                  <Input
                    id="title"
                    placeholder={String(listTitle)}
                    // バリデーション
                    {...register('title', { required: true })}
                  />
                </FormLabel>
                {errors.title && (
                  <Text color="red.400">リスト名を入力してください</Text>
                )}
              </Box>
              <Box>
                <Button mt={4} colorScheme="teal" type="submit">
                  編集する
                </Button>
              </Box>
            </form>
            <Box>
              <Button
                mt={4}
                colorScheme="red"
                type="submit"
                onClick={onDeleteList}
              >
                削除する
              </Button>
            </Box>
          </VStack>
        </Box>
        <Link href="/">
          <Button>戻る</Button>
        </Link>
      </Box>
    </AuthGuard>
  );
};

export default ListEdit;
