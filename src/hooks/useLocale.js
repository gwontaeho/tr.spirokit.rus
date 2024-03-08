import { useRecoilState } from "recoil";
import { localeState } from "@/recoil";

export const useLocale = () => {
  const [locale, setLocale] = useRecoilState(localeState);

  return { locale, setLocale };
};
