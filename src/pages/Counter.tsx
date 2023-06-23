import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@chakra-ui/button';
import { Box, Flex, Text } from '@chakra-ui/react';
import { url } from '../const';
import { LoginStatusContext } from '../App';

type Artical = {
  id: string;
  title: string;
};

export const Counter = () => {
  const { loading, token } = useContext(LoginStatusContext);
  const [list, setList] = useState<Artical[]>([]);
  const [selectListId, setSelectListId] = useState('');
  const [selectTitle,setSelectTitle] = useState("")
  const [timestamp, setTimestamp] = useState('');
  const [elapsedTime, setElapsedTime] = useState('');

  const login = token !== '';
  // console.log(token);

  useEffect(() => {
    if (login) {
      axios
        .get(`${url}/do_lists`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

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
    }
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

  const handleSelectList = (data: any) => {
    // console.log(data.id);
    // console.log(data.title);
    setSelectListId(data.id);
    setSelectTitle(data.title)
  };

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
        <Box textAlign="center" p={30} bg="#fefefe" h="88vh">
          {login ? (
            <Box>
              <Box mt={3} mb={8}>
                <Text mb={4}>リスト一覧</Text>
                <ul className="list-tab" role="tablist" aria-label="リスト一覧">
                  {list.map((data) => {
                    const isActive = data.id === selectListId;
                    return (
                      <li
                        tabIndex={0}
                        role="tab"
                        key={data.id}
                        className={`list-tab-item ${isActive ? 'active' : ''}`}
                        onClick={() => handleSelectList(data)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            handleSelectList(data);
                          }
                        }}
                      >
                        {data.title}
                      </li>
                    );
                  })}
                </ul>
                <Flex w="200px" justifyContent="space-between" m="0 auto">
                  <Box mr={3}>
                    <Link to="/list_create">リスト作成</Link>
                  </Box>
                  <Box>
                    {selectListId !== '' && (
                      <Link to={`list/${selectListId}/edit`} state={{ selectTitle }} >リスト編集</Link>
                    )}
                  </Box>
                </Flex>
              </Box>
              <Box
                w="100%"
                h="30vh"
                rounded={40}
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
                variant="solid"
                fontSize={{ base: 'xl', lg: '3xl' }}
                bgColor="#7bdbe6"
                borderBottom="solid 5px #4d618d"
                borderRadius="10px"
                mt="24px"
                size={{ base: 'lg' }}
                onClick={handleUpdateTimestamp}
              >
                のんだ！
              </Button>
              <Box mt={4}>
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
