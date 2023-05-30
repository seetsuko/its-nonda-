import React from 'react';
import { Heading } from '@chakra-ui/react'
import './scss/Header.scss';

export const Header = () => {
  return (
    <Heading
      as="h1"
      size='2xl'
      >
      <p>it&apos;s のんだ？</p>
    </Heading>
  );
};
