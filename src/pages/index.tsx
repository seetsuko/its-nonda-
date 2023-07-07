import { useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { AuthGuard } from '../feature/auth/component/AuthGuard.tsx/AuthGuard';
import { useAuthContext } from '../feature/auth/provider/AuthProvider';
import { url } from '../lib/apiPath/const';

type Artical = {
  id: string;
  title: string;
};

const inter = Inter({ subsets: ['latin'] });

const Page = () => {
  const [list, setList] = useState<Artical[]>([]);
  const [selectListData, setSelectListData] = useState();
  const [selectListId, setSelectListId] = useState();
  const [timestamp, setTimestamp] = useState('');
  const [elapsedTime, setElapsedTime] = useState('');
  const { userDetails } = useAuthContext();

  const noSelectList = selectListId === undefined;
  // console.log(userDetails?.uid);
  // console.log(selectListId)

  useEffect(() => {
    if (userDetails !== undefined) {
      const userId = userDetails?.uid;
      axios
        .get(`${url}/users/${userId}/do_lists`)
        .then((res) => {
          setList(res.data);
          setSelectListData(res.data.at(0));
          setSelectListId(res.data.at(0)?.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userDetails]);

  useEffect(() => {
    if (!noSelectList) {
      axios
        .get(`${url}/do_lists/${selectListId}/time_logs`)
        .then((res) => {
          // console.log(res.data);
          setTimestamp(res.data.at(-1)?.time);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectListId]);

  useEffect(() => {
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
    setSelectListData(data);
    setElapsedTime('');
  };

  const handleUpdateTimestamp = () => {
    const time = dayjs().format('YYYY/MM/DD HH:mm:ss');
    const data = { time: time };
    axios.post(`${url}/do_lists/${selectListId}/time_logs`, data).then(() => {
      setTimestamp(time);
      setElapsedTime('');
      console.log('POST完了！');
    });
  };

  return (
    <>
      <Head>
        <title>マイキロくん</title>
        <meta
          name="description"
          content="時間経過を測るアプリ。育児記録や健康管理等をサポートします。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <AuthGuard>
          <Box textAlign="center" p={30} bg="#fefefe" h="88vh">
            <Box m={3} mb={8} textAlign="center">
              <Text mb={4} fontSize="xl">
                リスト一覧
              </Text>
              {list.map((data) => {
                const isActive = data.id === selectListId;
                return (
                  <Button
                    size="sm"
                    mr={2}
                    mb={2}
                    key={data.id}
                    bgColor={`${isActive ? '#a2f7df' : ''}`}
                    onClick={() => handleSelectList(data)}
                  >
                    {data.title}
                  </Button>
                );
              })}
              <Flex
                w="200px"
                justifyContent="space-between"
                m="20px auto"
                color="#1715ac"
              >
                <Box mr={3} borderBottom="solid 1px" w="120px" as="b">
                  <Link href="/listCreate">リスト作成</Link>
                </Box>
                {!noSelectList ? (
                  <Box borderBottom="solid 1px" w="120px" as="b">
                    <Link
                      href={{
                        pathname: `list/${selectListId}/edit`,
                        query: selectListData,
                      }}
                    >
                      リスト編集
                    </Link>
                  </Box>
                ) : (
                  <Box w="120px" as="b" color="#00000047">
                    <Text>リスト編集</Text>
                  </Box>
                )}
              </Flex>
            </Box>

            <Box
              w="100%"
              h="33vh"
              rounded={40}
              p={4}
              borderWidth="1px"
              borderColor="gray"
            >
              {noSelectList ? (
                <Text as="b">リストを作成してください</Text>
              ) : (
                <Box>
                  <Box mt={3}>
                    <Text>前回のキロクタイム</Text>
                    {timestamp === undefined ? (
                      <Text as="b" fontSize={'xl'}>
                        「キロク！」を押してね
                      </Text>
                    ) : (
                      <Text as="b" fontSize={'xl'}>
                        {timestamp}
                      </Text>
                    )}
                  </Box>
                  <Box mt={4} mb={5}>
                    <Text>経過時間</Text>
                    <Text as="b">{elapsedTime}</Text>
                  </Box>
                  {timestamp !== undefined && (
                    <Box
                      borderBottom="solid 1px"
                      w="120px"
                      m="0 auto"
                      color="#1715ac"
                      as="b"
                    >
                      <Link
                        href={{
                          pathname: `record/${selectListId}`,
                          query: selectListData,
                        }}
                      >
                        過去のキロク
                      </Link>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
            {!noSelectList && (
              <Button
                variant="solid"
                fontSize={{ base: 'xl', lg: '3xl' }}
                bgColor="#7bdbe6"
                borderBottom="solid 8px #4d618d"
                borderRadius="10px"
                mt="24px"
                size={{ base: 'lg' }}
                onClick={handleUpdateTimestamp}
              >
                キロク！
              </Button>
            )}
          </Box>

          <Flex
            w="200px"
            justifyContent="space-between"
            m="20px auto"
            color="#1715ac"
          >
            <Box mr={3} borderBottom="solid 1px" w="120px" as="b">
              <Link href="/">リスト作成</Link>
            </Box>
          </Flex>
        </AuthGuard>
      </main>
    </>
  );
};

export default Page;
