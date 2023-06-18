import React, { useContext } from 'react';
import { Heading, Box, Container, Flex, Button } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { LoginStatusContext } from './App';

export const Header = () => {
  const navigate = useNavigate();
  const { loading, token, setToken } = useContext(LoginStatusContext);
  const location = useLocation();
  const loginPagePath = location.pathname === '/login';

  // ログインしているかどうかを判定する
  const login = token !== '';

  const handleLogoutSubmit = async () => {
    if (window.confirm('ログアウトしますか？')) {
      await signOut(auth);
      setToken('');
      navigate('/login');
    }
  };

  return (
    <Box px={5} bgColor="green.200" height="12vh" m={0}>
      {!loading && (
        <Container width="90vw">
          <Flex as="header" py="5" justifyContent="space-between" m="0px">
            <Link to="/">
              <Heading as="h1" fontSize="2xl" cursor="pointer">
                のんだ？
              </Heading>
            </Link>
            {login ? (
              <Button onClick={handleLogoutSubmit}> ログアウト</Button>
            ) : (
              <Box>
                {loginPagePath ? (
                  <Box> </Box>
                ) : (
                  <Button>
                    <Link to="/login"> ログイン</Link>
                  </Button>
                )}
              </Box>
            )}
          </Flex>
        </Container>
      )}
    </Box>
  );
};
