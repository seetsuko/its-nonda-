import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '@/src/lib/firebase/firebase';
import type { User } from '@firebase/auth';

export type GlobalAuthState = {
  userDetails: User | null | undefined;
};
const initialState: GlobalAuthState = {
  userDetails: undefined,
};
const AuthContext = createContext<GlobalAuthState>(initialState);

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<GlobalAuthState>(initialState);

  useEffect(() => {
    try {
      return onAuthStateChanged(auth, (userDetails) => {
        setUser({
          userDetails,
        });
      });
    } catch (error) {
      setUser(initialState);
      throw error;
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
