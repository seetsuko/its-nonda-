import Head from 'next/head';
import { Inter } from 'next/font/google';
import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../const';

type Artical = {
  id: string;
  title: string;
};

const inter = Inter({ subsets: ['latin'] });

const Page = () => {
  // const { loading, token, uid } = useContext(LoginStatusContext);

  const [list, setList] = useState<Artical[]>([]);
  const [selectListId, setSelectListId] = useState(undefined);
  const [selectTitle, setSelectTitle] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [elapsedTime, setElapsedTime] = useState('');

  // const login = token !== '' && uid !== undefined;
  const noListId = selectListId === undefined;
  // useEffect(() => {
  //     axios
  //       .get(`${url}/users/${uid}/do_lists`)
  //       .then((res) => {
  //         setList(res.data);
  //         setSelectListId(res.data.at(0)?.id);
  //         setSelectTitle(res.data.at(0)?.title);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  // }, []);

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
        <Box textAlign="center" p={30} bg="#fefefe" h="88vh">
          <Box m={3} mb={8} textAlign="center">
            <Text mb={4} fontSize="xl">
              リスト一覧
            </Text>
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
        </Box>
      </main>
    </>
  );
}

export default Page