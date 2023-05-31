import React from 'react';
import { Heading,Box,Container,Flex } from '@chakra-ui/react'
import './scss/Header.scss';

export const Header = () => {
  return (
    <Box px={4} bgColor="green.200">
            <Container maxW="container.lg">
                <Flex as="header" py="4" justifyContent="space-between" alignItems="center">
                        <Heading as='h1' fontSize="2xl" cursor="pointer">
                        it&apos;s のんだ？
                        </Heading>
                </Flex>
            </Container>
        </Box>
  );
};
