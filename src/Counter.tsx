import React, { useEffect, useState } from 'react';
import { Box, Text, Button, calc, Divider } from '@chakra-ui/react';
import dayjs from 'dayjs';

export const Counter = () => {
  const [count, setCount] = useState(0);
  const [timeStamp, setTimeStamp] = useState("");
  const min = Math.floor(count/60)

    const increment = () => {
      const now = dayjs().format("YYYY-MM-DDTHH:mm:ss")
      setTimeStamp(now)
      const interval = setInterval(() => {
        setCount(c => c + 1);
      }, 1000);
      return () => clearInterval(interval);
    }

  return (
    <Box padding={10} backgroundColor="red" display="block" textAlign="center">
      <Text>カウント：{min}：
      {count}
      </Text>
      <Text>時間：{timeStamp}</Text>
      <Button colorScheme="blue" onClick={increment}>
        Button
      </Button>
    </Box>
  );
};
