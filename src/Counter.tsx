import React, { useState } from "react"
import { Box,Text, Button } from '@chakra-ui/react'

export const Counter = () => {

  const [count, setCount] = useState(0)

  const onIncrement = () => {
    setCount(count + 1)
  }

  return(
    <Box
        padding={10}
        backgroundColor="red"
        display='block'
        textAlign='center'
        >
      <Text>カウント：{count}</Text>
      <Button
          colorScheme='blue'
          onClick={onIncrement}
      >Button</Button>
    </Box>
  )
}