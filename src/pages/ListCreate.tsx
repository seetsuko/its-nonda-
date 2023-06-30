import React, { useContext } from 'react';
import {
  Box,
  Button,
  FormLabel,
  Input,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginStatusContext } from '../App';
import { url } from '../const';

export const ListCreate = () => {
  const { loading, token, uid, setLoading } = useContext(LoginStatusContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = token !== '';
  // console.log(token);

  const onCreateSubmit = async (data: any) => {
    setLoading(true);
    await axios.post(`${url}/users/${uid}/do_lists`, data).then((res) => {
      console.log('作成完了！');
      navigate('/');
    });
  };

  return (
    <Box w="90vw">
      {!loading ? (
        <Box textAlign="center" p={50} bg="#fefefe" h="88vh">
          {login ? (
            <Box m={3} mb={8} textAlign="center">
              <Text fontSize="xl"> リスト作成</Text>
              <VStack>
                <form
                  onSubmit={handleSubmit(onCreateSubmit)}
                  className="user-form"
                >
                  <Box>
                    <FormLabel htmlFor="title">
                      リスト名
                      <Input
                        id="title"
                        placeholder="リスト名を入力"
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
                      作成！
                    </Button>
                  </Box>
                </form>
              </VStack>
            </Box>
          ) : (
            <Navigate to="/login" />
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
