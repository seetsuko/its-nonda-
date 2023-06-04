import { Button } from '@chakra-ui/react';
import { User, signOut, onAuthStateChanged } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { auth } from '../FirebaseConfig';

type UserType = User | null;

export const Mypage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  console.log(user);

  return (
    <div>
      {!loading && (
        <div>
          <h1>マイページ</h1>
          {user ? <div>ログイン状態です</div> : <>未ログイン</>}
        </div>
      )}
    </div>
  );
};
