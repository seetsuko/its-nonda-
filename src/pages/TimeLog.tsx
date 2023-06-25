import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../const';
import { LoginStatusContext } from '../App';

type Artical = {
  id: string;
  time: string;
};

export const TimeLog = () => {
  const id = useParams();
  const { state } = useLocation();
  const title = state.selectTitle;
  const { loading, token } = useContext(LoginStatusContext);
  const [dataLog, setDataLog] = useState<Artical[]>([]);

  const login = token !== '';
  // console.log(token);
  console.log(id);
  console.log(title);

  useEffect(() => {
    if (login) {
      axios
        .get(`${url}/do_lists/${id.listId}/time_logs/`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setDataLog(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  console.log(dataLog);

  return (
    <Box>
      {!loading && (
        <Box textAlign="center" p={50} bg="#fefefe" h="88vh">
          {login ? (
            <Box m={3} mb={8} textAlign="center">
              <Box mb={4}>
                <Text fontSize="xl" as="b">
                  リスト： {title}
                </Text>
              </Box>
              <Box>
                <Text>ボタンを押した時間の記録</Text>
              </Box>
              <Box
                w="100%"
                h="50vh"
                rounded={40}
                p={4}
                borderWidth="1px"
                borderColor="gray"
                overflow="auto"
                mt={5}
              >
                {dataLog.map((data) => {
                  return (
                    <Box mt={2} key={data.id}>
                      <Text as="b">{data.time}</Text> <br />
                    </Box>
                  );
                })}
              </Box>
              <Box mt={2}>
              <Link to="/"><Button>戻る</Button></Link>
              </Box>
            </Box>
          ) : (
            <Navigate to="/login" />
          )}
        </Box>
      )}
    </Box>
  );
};
