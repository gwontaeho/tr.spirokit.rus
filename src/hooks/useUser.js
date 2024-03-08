import { useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "@/recoil";

export const useUser = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? {} : user, setUser, resetUser];
};
