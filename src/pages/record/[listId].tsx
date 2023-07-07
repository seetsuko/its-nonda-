import { Box, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthGuard } from '@/src/feature/auth/component/AuthGuard.tsx/AuthGuard';
import type { NextPage } from 'next';

const Record: NextPage = () => {
  // パラメータはクエリオブジェクトとしてページに渡されます
  const router = useRouter();
  const { listId } = router.query;
  const listTitle = router.query.title;

  console.log(listId);
  console.log(listTitle);

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
            {editMode
              ? dataLog.map((data) => {
                  return (
                    <Link href="/" key={data.id}>
                      <Box mt={2.5} borderBottom="1px" borderColor="gray.300">
                        <Text as="b">{data.time}</Text>
                      </Box>
                    </Link>
                  );
                })
              : dataLog.map((data) => {
                  return (
                    <Box mt={3} key={data.id}>
                      <Text as="b">{data.time}</Text>
                    </Box>
                  );
                })}
          </Box>
          <Box mt={2}>
            {editMode ? (
              <Button
                mr={2}
                colorScheme="teal"
                onClick={() => setEditMode(false)}
              >
                編集中止
              </Button>
            ) : (
              <Button
                mr={2}
                colorScheme="teal"
                onClick={() => setEditMode(true)}
              >
                編集する
              </Button>
            )}
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
