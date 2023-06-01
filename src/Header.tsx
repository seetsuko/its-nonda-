import React from 'react';
import { Heading, Box, Container, Flex, Button } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Box px={5} bgColor="green.200" height={20}>
      <Container width="100vw">
        <Flex as="header" py="5" justifyContent="space-between" m="0px">
          <Heading as="h1" fontSize="2xl" cursor="pointer">
            のんだ？
          </Heading>
          <Button>ログイン</Button>
        </Flex>
      </Container>
    </Box>
  );
};
