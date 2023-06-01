import React from 'react';
import { Heading, Box, Container, Flex } from '@chakra-ui/react';
import './scss/Header.scss';

export const Header = () => {
  return (
    <Box px={5} bgColor="green.200" height={20}>
      <Container width="100vw">
        <Flex as="header" py="5" justifyContent="space-between" width="100vw">
          <Heading as="h1" fontSize="2xl" cursor="pointer">
            のんだ？
          </Heading>
        </Flex>
      </Container>
    </Box>
  );
};
