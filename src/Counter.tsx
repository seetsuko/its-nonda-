import React, { useEffect, useState } from 'react';
import { Box, Text, Button, calc, Divider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import axios, { AxiosResponse } from "axios"

type Artical = {
  id: string;
  amount: number;
  time: string;
}

const getArticals = async (): Promise<Artical[]> => {
  try{
    const url = "http://localhost:3100/timer"
    const response = await axios.get<Artical[]>(url)
    console.log(response)
    return response.data
  } catch(error) {
    console.error(error);
    return[]
  }
}

export const Counter = () => {
  const [timerData, setTimerData] = useState<[] |Artical[]>([]);
  const [count, setCount] = useState(0);
  const [timeStamp, setTimeStamp] = useState("");
  const min = Math.floor(count/60)


    useEffect(() =>{
      (async () =>{
        const data =await getArticals();
        setTimerData(data)
      })()
    },[]);

    console.log(timerData)

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
      {/* <div>{timerData}</div> */}
    </Box>
  );
};
