import React, { useState, useEffect } from 'react';
import { Heading, Box, Container, Flex, Button } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './FirebaseConfig';

type UserType = User | null;

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginPagePath = location.pathname === '/login';
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  // ログインしているかどうかを判定する
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const handleLogoutSubmit = async () => {
    if (window.confirm('ログアウトしますか？')) {
      await signOut(auth);
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
            {user ? (
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
