import { useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { subjectState } from "@/recoil";

export const useSubject = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [subject, setSubject] = useRecoilState(subjectState);
  const resetSubject = useResetRecoilState(subjectState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  /*
  chartNumber
  date
  pre_g
  post_g
  pre_r
  post_r
  tab
  type
  */

  return [isInitial ? {} : subject, setSubject, resetSubject];
};
