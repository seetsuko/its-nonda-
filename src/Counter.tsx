import React, { useState } from "react"
import { Box,Text, Button } from '@chakra-ui/react'
import {  differenceInMinutes,differenceInHours, differenceInSeconds } from "date-fns";
import { format } from "date-fns-tz";

export const Counter = () => {
  const defaultDate = new Date().toString()
  const [timeStamp, setTimeStamp] = useState(defaultDate);
  const [count, setCount] = useState(0)

console.log(timeStamp)
  const onIncrement = () => {
    const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss xxx', { timeZone: 'Asia/Tokyo' })
    setCount(count + 1)
    setTimeStamp(date)
  }

  const timeLimit = () =>{
      const diffInMinutes = differenceInMinutes(new Date(),Date.parse(timeStamp));
      const diffInHours = differenceInHours(new Date(),Date.parse(timeStamp));
      const diffInSeconds = differenceInSeconds(new Date(),Date.parse(timeStamp));
      const sec = diffInSeconds%60
      const min = diffInMinutes%60
      const hour = diffInHours%24
      console.log(sec)
    return(
      <div><Text>時間：{hour}</Text>
      <Text>分：{min}</Text></div>
    )
  }

  return(
    <Box
        padding={10}
        backgroundColor="red"
        display='block'
        textAlign='center'
        >
      <Text>カウント：{count}</Text>
      <Text>時間：{}</Text>
      {timeLimit()}
      {/* <Text>時間：{hour}</Text>
      <Text>分：{min}</Text> */}
      <Button
          colorScheme='blue'
          onClick={onIncrement}
      >Button</Button>
    </Box>
  )
}