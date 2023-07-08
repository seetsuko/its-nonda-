import {
  Heading,
  Box,
  Container,
  Flex,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthContext } from '@/src/feature/auth/provider/AuthProvider';
import auth from '@/src/lib/firebase/firebase';

const Header = () => {
  const toast = useToast();
  const router = useRouter();
  const { userDetails } = useAuthContext();

  const loginPagePath = router.pathname === '/login';

  const handleLogoutSubmit = async () => {
    await signOut(auth);
    toast({
      title: 'ログアウトしました。',
      status: 'success',
      position: 'top',
    });
  };

  return (
    <Box px={5} bgGradient="linear(to-r,#56eacd,#566eea)" h="12vh" m={0}>
      <Container width="90vw">
        <Flex as="header" py="5" justifyContent="space-between" m="0px">
          <Link href="/">
            <Heading cursor="pointer">
              <Text
                fontSize="3xl"
                sx={{
                  textShadow:
                    ' 3px 5px 6px #00000067, 0 0 1em #ffffff, 0 0 0.5em #fff',
                }}
              >
                マイキロくん
              </Text>
            </Heading>
          </Link>
          {userDetails ? (
            <Button onClick={handleLogoutSubmit}> ログアウト</Button>
          ) : (
            <Box>
              {loginPagePath ? (
                <Box> </Box>
              ) : (
                <Button>
                  <Link href="/login"> ログイン</Link>
                </Button>
              )}
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
