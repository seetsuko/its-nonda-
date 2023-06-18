import React, { useContext, useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../const';
import { LoginStatusContext } from '../App';

type Artical = {
  id: string;
  time: string;
};

export const TimeList = () => {
  const { loading, token } = useContext(LoginStatusContext);
  const [dataLog, setDataLog] = useState<Artical[]>([]);

  const login = token !== '';
  console.log(token);

  useEffect(() => {
    if (login) {
      axios
        .get(`${url}/time_logs`, {
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
  }, [login]);

  return (
    <Box>
      {!loading && (
        <Box textAlign="center" p={30} bg="#f7ffe5" h="88vh">
          {login ? (
            <Box>
              <Text as="b">ボタンを押した時間の記録</Text>
              <Box
                w="100%"
                h="60vh"
                rounded="md"
                p={4}
                borderWidth="1px"
                borderColor="gray"
                overflow="auto"
                mt={5}
              >
                {dataLog.map((d) => {
                  return (
                    <Box mt={2}>
                      <Text as="samp">{d.time}</Text> <br />
                    </Box>
                  );
                })}
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
