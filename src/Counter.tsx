import React, { useState } from "react"

export const Counter = () => {

  const [count, setCount] = useState(0)

  return(
    <div>
      カウント：{count}
    </div>
  )
}