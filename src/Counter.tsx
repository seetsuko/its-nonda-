import React, { useEffect, useState } from 'react';
import { Box, Text, Button, calc, Divider } from '@chakra-ui/react';
import dayjs from 'dayjs';

export const Counter = () => {
  const [count, setCount] = useState("");

  // 時計の関数
    useEffect(() => {
      const interval = setInterval(() => {
        setCount(String(dayjs()));
      }, 1000);
      return () => clearInterval(interval);
    }, []);
    console.log(count)

    // ボタンを

  return (
    <Box padding={10} backgroundColor="red" display="block" textAlign="center">
      <Text>カウント：{count}ml</Text>
      <Text>時間：</Text>
      <Button colorScheme="blue">
        Button
      </Button>
    </Box>
  );
};
