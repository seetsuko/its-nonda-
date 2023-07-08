import { useEffect, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthGuard } from '@/src/feature/auth/component/AuthGuard.tsx/AuthGuard';
import { url } from '@/src/lib/apiPath/const';
import type { NextPage } from 'next';

type Artical = {
  id: string;
  time: string;
};

const Record: NextPage = () => {
  const [timeRecords, setTimeRecords] = useState<Artical[]>([]);
  const router = useRouter();

  const { listId } = router.query;
  const listTitle = router.query.title;
  // console.log(listId);
  // console.log(listTitle);

  useEffect(() => {
    if (listId !== undefined)
      axios
        .get(`${url}/do_lists/${listId}/time_logs/`)
        .then((res) => {
          setTimeRecords(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [listId]);

  return (
    <AuthGuard>
      <Box textAlign="center" p={50} bg="#fefefe" h="88vh">
        <Box m={3} mb={8} textAlign="center">
          <Box mb={4}>
            <Text fontSize="xl" as="b">
              リスト： {listTitle}
            </Text>
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
            <Box>
              <Text>キロク！の記録</Text>
            </Box>
            {timeRecords.map((data) => {
              return (
                <Box mt={3} key={data.id}>
                  <Text as="b">{data.time}</Text>
                </Box>
              );
            })}
          </Box>
          <Box mt={2}>
            <Link href="/">
              <Button>戻る</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </AuthGuard>
  );
};

export default Record;
