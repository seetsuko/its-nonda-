import React, { useContext } from 'react';
import { Box, Button, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LoginStatusContext } from '../App';
import { url } from '../const';

interface State {
  selectListId: string;
}

export const ListEdit = () => {
  const location = useLocation();
  const { selectListId } = location.state as State;
  const { loading, token } = useContext(LoginStatusContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = token !== '';
  // console.log(token);
  console.log(selectListId);

  const onCreateSubmit = async (data: any) => {
    await axios
      .post(`${url}/do_lists`, data, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('POST完了！');
        navigate('/');
      });
  };

  return (
    <Box w="90vw">
      {!loading && (
        <Box>
          {login ? (
            <Box>
              <Text fontSize="xl"> リスト編集</Text>
              <VStack>
                {selectListId}
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
      )}
    </Box>
  );
};
