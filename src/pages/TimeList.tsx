import { Box, Text } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../FirebaseConfig';

type UserType = User | null;

type Artical = {
  id: string;
  time: string;
};
const urlAPI = 'http://localhost:3100/timer';

export const TimeList = () => {
  const [dataLog, setDataLog] = useState<Artical[]>([]);
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    axios.get(urlAPI).then((res) => {
      setDataLog(res.data);
    });
  }, []);

  console.log(dataLog);

  return (
    <Box>
      {!loading && (
        <Box textAlign="center" p={30} bg="#f7ffe5" h="88vh">
          {user ? (
            <Box>
              <Text as="b">ボタンを押した時間の記録</Text>
              <Box
                w="100%"
                h="60vh"
                rounded="md"
                p={4}
                borderWidth="1px"
                borderColor="gray"
                overflow="auto"
                mt={5}
              >
                {dataLog.map((d) => {
                  return (
                    <Box mt={2}>
                      <Text as="samp">{d.time}</Text> <br />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ) : (
            <Navigate to="/login" />
          )}
        </Box>
      )}
    </Box>
  );
};
