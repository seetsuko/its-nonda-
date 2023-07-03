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
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { LoginStatusContext } from '../App';
import { url } from '../const';

export const TimeEdit = () => {
  const id = useParams();
  const { state } = useLocation();
  // const title = state.selectTitle;
  const { loading, token } = useContext(LoginStatusContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = token !== '';
  // console.log(id.listId);
  // console.log(title);

  const onEditTime = async (data: any) => {
    await axios.put(`${url}/do_lists/${id.listId}`, data).then((res) => {
      console.log(res);
      navigate('/');
    });
  };

  const onDeleteTime = () => {
    if (window.confirm('削除しますか？')) {
      axios.delete(`${url}/do_lists/${id.listId}`).then((res) => {
        console.log('削除完了');
        navigate('/');
      });
    }
  };

  return (
    <Box w="90vw">
      {!loading ? (
        <Box textAlign="center" p={50} bg="#fefefe" h="88vh">
          {login ? (
            <Box m={3} mb={8} textAlign="center">
              <Text fontSize="xl"> キロク編集</Text>
              <VStack>
                <form onSubmit={handleSubmit(onEditTime)} className="user-form">
                  <Box>
                    <FormLabel htmlFor="time">
                      時間
                      <Input
                        id="title"
                        type={'datetime-local'}
                        // placeholder={title}
                        // バリデーション
                        {...register('time', { required: true })}
                      />
                    </FormLabel>
                    {errors.title && (
                      <Text color="red.400">時間を選択してください</Text>
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
                    onClick={onDeleteTime}
                  >
                    削除する
                  </Button>
                </Box>
                <Link to={`/time_list/${id.listid}`}>
                  <Button mt={7}>戻る</Button>
                </Link>
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
