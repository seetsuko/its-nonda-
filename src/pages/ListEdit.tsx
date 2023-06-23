import React, { useContext } from 'react';
import { Box, Button, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LoginStatusContext } from '../App';
import { url } from '../const';

export const ListEdit = () => {
  const id =useParams()
  const {state} = useLocation()
  const title =state.selectTitle
  const { loading, token } = useContext(LoginStatusContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = token !== '';
  // console.log(id.listId);
  console.log(title)


  const onCreateSubmit = async (data: any) => {
    await axios
      .put(`${url}/do_lists/${id.listId}`, data, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
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
                <form
                  onSubmit={handleSubmit(onCreateSubmit)}
                  className="user-form"
                >
                  <Box>
                    <FormLabel htmlFor="title">
                      リスト名
                      <Input
                        id="title"
                        placeholder={title}
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
                      編集！
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
