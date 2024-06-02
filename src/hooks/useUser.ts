import { useEffect, useState } from "react";

export const useUserState = () => {
  const [isGuessUser, setIsGuessUser] = useState(false);

  const isGuessUser;

  return {
    isGuessUser,
    isLoginedUser,
  };
};
