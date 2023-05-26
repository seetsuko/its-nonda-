import React, { SetStateAction, useEffect, useState } from 'react';
import { Box, Text, Button, calc, Divider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import axios, { AxiosResponse } from "axios"

type Artical = {
  id: string;
  amount: number;
  time: string;
}
const urlAPI = "http://localhost:3100/timer"


export const Counter = () => {
  const [drinkData, setDrinkData] = useState([]);
  const [drinkTime,setDrinkTime] = useState("")
  const [count, setCount] = useState(0);
  const [timeStamp, setTimeStamp] = useState("");
  const min = Math.floor(count/60)


    useEffect(()=>{
      axios.get(urlAPI)
    .then((res)=>{
      console.log(res)
      setDrinkData(res.data)
    })
    .catch((error)=> {
      console.log(error);
    })
    },[]);

    // console.log(drinkTime)

    const increment = () => {
      const now = dayjs().format("YYYY-MM-DDTHH:mm:ss")
      setTimeStamp(now)
      const interval = setInterval(() => {
        setCount(c => c + 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    const test = (data:SetStateAction<string>) =>{
      setDrinkTime(data)
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
      <div>
        <ul>
          {drinkData.map((data:Artical)=>{
            test(data.time)
            return(
            <li key={data.id.toString()}><p>{data.time}</p><p>{data.amount}ml</p></li>)
})}
        </ul>
        {/* {timerData} */}
      </div>
    </Box>
  );
};
