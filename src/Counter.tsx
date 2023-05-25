import React, { useState } from "react"
import { Box,Text, Button } from '@chakra-ui/react'
import {  differenceInMinutes,differenceInHours, differenceInSeconds } from "date-fns";
import { format } from "date-fns-tz";

export const Counter = () => {
  const [count, setCount] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [calcTime, setCalcTime] = useState(0)
  const [displayTaime,setDisplayTime]=useState(0)

  const onIncrement = () =>{
    setCount(count + 200)
    const timeStamp = Date.now()
    setStartTime(timeStamp)
    setCalcTime(timeStamp-startTime)
  }

const test = () => {
  console.log(startTime)
  console.log(calcTime)
  const currentTime = new Date(calcTime)
  const display = String(currentTime)
  return(<div>{display}</div>)
}

  return(
    <Box
        padding={10}
        backgroundColor="red"
        display='block'
        textAlign='center'
        >
      <Text>カウント：{count}ml</Text>
      <Text>時間：{}</Text>
      {test()}
      <Button
          colorScheme='blue'
          onClick={onIncrement}
      >Button</Button>
    </Box>
  )
}