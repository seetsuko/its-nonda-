import React, { useState } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  const onIncrement = () => {
    setCount(count + 200);
  };

  const time = () => {

  }

  return (
    <Box padding={10} backgroundColor="red" display="block" textAlign="center">
      <Text>カウント：{count}ml</Text>
      <Text>時間：{}</Text>
      <Button colorScheme="blue" onClick={onIncrement}>
        Button
      </Button>
    </Box>
  );
};
