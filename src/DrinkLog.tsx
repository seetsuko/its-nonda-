import React, { SetStateAction, useEffect, useState } from 'react';
import { Box, Text, Button, calc, Divider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import axios, { AxiosResponse } from 'axios';

type Artical = {
  id: string;
  amount: number;
  time: string;
};
const urlAPI = 'http://localhost:3100/timer';

export const Counter = () => {
  const [drinkData, setDrinkData] = useState([]);
  const [drinkTime, setDrinkTime] = useState('');
  const [drinkCount, setDrinkCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState('');
  const [running, setRunning] = useState(false);

  useEffect(() => {
    axios
      .get(urlAPI)
      .then((res) => {
        setDrinkData(res.data);
        res.data.map((data: Artical) => {
          return setDrinkTime(data.time);
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log('スタート・ストップが切り替わりました。');
    if (running) {
      const interval = setInterval(() => {
        const now = dayjs().format('YYYY-MM-DDTHH:mm:ss');
        const diffHour = dayjs(now).diff(dayjs(drinkTime), 'hour');
        const diffMin = dayjs(now).diff(dayjs(drinkTime), 'minute');
        const diffSec = dayjs(now).diff(dayjs(drinkTime), 'second');

        setElapsedTime(`${diffHour}時間${diffMin % 60}分${diffSec % 60}秒`);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [running]);

  console.log(drinkTime);

  const increment = () => {
    setRunning(true);
    setElapsedTime('');
  };

  console.log(elapsedTime);

  return (
    <Box padding={10} backgroundColor="red" display="block" textAlign="center">
      <Text>カウント：{drinkCount}</Text>
      <Text>時間：{elapsedTime}</Text>
      <Button colorScheme="blue" onClick={increment}>
        Button
      </Button>
      <div>
        <ul>
          {drinkData.map((data: Artical) => {
            return (
              <li key={data.id}>
                <p>{data.time}</p>
                <p>{data.amount}ml</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Box>
  );
};
