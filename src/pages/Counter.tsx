import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/react';
import { url } from '../const';
import { LoginStatusContext } from '../App';

export const Counter = () => {
  const { loading, token } = useContext(LoginStatusContext);
  const [timestamp, setTimestamp] = useState('');
  const [elapsedTime, setElapsedTime] = useState('');

  const login = token !== '';
  console.log(token);

  useEffect(() => {
    axios
      .get(`${url}/do_logs`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTimestamp(res.data.at(-1)?.time);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    // タイムスタンプからの経過時間を計算
    if (timestamp !== '') {
      const interval = setInterval(() => {
        const now = dayjs().format('YYYY/MM/DD HH:mm:ss');
        const diffHour = dayjs(now).diff(dayjs(timestamp), 'hour');
        const diffMin = dayjs(now).diff(dayjs(timestamp), 'minute');
        const diffSec = dayjs(now).diff(dayjs(timestamp), 'second');
        setElapsedTime(`${diffHour}時間${diffMin % 60}分${diffSec % 60}秒`);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [timestamp]);

  const handleUpdateTimestamp = () => {
    const time = dayjs().format('YYYY/MM/DD HH:mm:ss');
    const data = { time: time };
    axios
      .post(`${url}/do_logs`, data, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTimestamp(time);
        setElapsedTime('');
        console.log('POST完了！');
      });
  };

  return (
    <Box>
      {!loading && (
        <Box textAlign="center" p={30} bg="#f7ffe5" h="88vh">
          {login ? (
            <Box>
              <Box
                w="100%"
                h="30vh"
                rounded="md"
                p={4}
                borderWidth="1px"
                borderColor="gray"
              >
                <Box mt={5}>
                  <Text as="b">前回ボタンを押した時間</Text>
                  <br />
                  <Text as="samp">{timestamp}</Text>
                </Box>
                <Box mt={5}>
                  <Text as="b">経過時間</Text>
                  <br />
                  <Text as="samp">{elapsedTime}</Text>
                </Box>
              </Box>
              <Button
                colorScheme="blue"
                mt="24px"
                size={{ base: 'lg' }}
                onClick={handleUpdateTimestamp}
              >
                のんだ！
              </Button>
              <Box>
                <Link to="/timeList">キロクを見る</Link>
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
