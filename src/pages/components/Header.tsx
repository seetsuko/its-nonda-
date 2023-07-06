// import React, { useContext } from 'react';
import { Heading, Box, Container, Flex, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { auth } from './FirebaseConfig';
// import { LoginStatusContext } from './App';

export const Header = () => {
  // const navigate = useNavigate();
  // const { loading, token, setToken } = useContext(LoginStatusContext);
  // const location = useLocation();
  // const loginPagePath = location.pathname === '/login';

  // const login = token !== '';

  const handleLogoutSubmit = () => {
    // const handleLogoutSubmit = async () => {
    // if (window.confirm('ログアウトしますか？')) {
      // await signOut(auth);
    //   navigate('/login');
    //   setToken('');
    // }
  };

  return (
    <Box px={5} bgGradient="linear(to-r,#56eacd,#566eea)" h="12vh" m={0}>
      {/* {!loading && ( */}
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
            {/* {login ? ( */}
              <Button onClick={handleLogoutSubmit}> ログアウト</Button>
             {/* ) : ( */}
              <Box>
                {/* {loginPagePath ? ( */}
                  <Box> </Box>
                 {/* ) : ( */}
                  <Button>
                    <Link href="/login"> ログイン</Link>
                  </Button>
                 {/* )} */}
              </Box>
             {/* )} */}
          </Flex>
        </Container>
       {/* )} */}
    </Box>
  );
};
