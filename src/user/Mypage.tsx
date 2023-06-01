import { Button } from "@chakra-ui/react";
import React from "react";


export const Mypage = () => {
  return (
    <div>
      <h1>マイページ</h1>
      <Button mt={4} colorScheme="teal" type="submit">
              ログアウト
            </Button>
    </div>
  );
};