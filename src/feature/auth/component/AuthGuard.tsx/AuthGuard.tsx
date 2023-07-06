import type { ReactNode } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuthContext } from '@/src/feature/auth/provider/AuthProvider';

type Props = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const { userDetails } = useAuthContext();
  const { push } = useRouter();

  if (typeof userDetails === 'undefined') {
    return (
      <Box mt="36vh" textAlign="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  if (userDetails === null) {
    push('/login');
  }

  return <>{children}</>;
};
