import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import React,{useEffect,useState} from 'react';

type Artical = {
  id: string;
  time: string;
};
const urlAPI = 'http://localhost:3100/timer';

export const TimeList = () => {
  
  const [timestamp, setTimestamp] = useState('');
  const [dataLog, setDataLog] = useState<Artical[]>([]);

  useEffect(() => {
    axios.get(urlAPI).then((res) => {
      setDataLog(res.data);
      });
  }, []);

  console.log(dataLog)

  return(
    <Box textAlign="center" p={30} bg="#f7ffe5"  h="88vh">
      <Text as="b">ボタンを押した時間の記録</Text>
      <Box
        w="100%"
        h="80vh"
        rounded="md"
        p={4}
        borderWidth="1px"
        borderColor="gray"
        overflow="auto"
        mt={5}
      >
        {dataLog.map((d)=>{
          return(<Box mt={2}><Text as="samp">{d.time}</Text> <br /></Box>)
        })}
      </Box>
    </Box>
  )
};
