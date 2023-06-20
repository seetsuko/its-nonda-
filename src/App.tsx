import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import { Box } from '@chakra-ui/react';
import { Router } from './routes/Router';
import { auth } from './FirebaseConfig';

type LoginStatus = {
  loading: boolean;
  token: string;
  setToken: any;
};

// ログインできてるか
export const LoginStatusContext = createContext<LoginStatus>({
  loading: true,
  token: '',
  setToken: '',
});

const App = () => {
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const value = {
    loading,
    token,
    setToken,
  };

  // ログインしているかどうかを判定する
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        currentUser.getIdToken(true).then((idToken) => {
          setToken(idToken);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  updateCurrentUser;

  return (
    <Box textAlign="center" m={0}>
      <LoginStatusContext.Provider value={value}>
        <Router />
      </LoginStatusContext.Provider>
    </Box>
  );
};

export default App;
