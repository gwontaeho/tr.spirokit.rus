"use client";

import i18n from "@/locale/i18n";
import { RecoilRoot, atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const localeState = atom({
  key: "localeState",
  default: "ko",
  effects_UNSTABLE: [persistAtom],
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        i18n.changeLanguage(newValue);
        window.localStorage.setItem("lang", newValue);
      });
    },
  ],
});

export const userState = atom({
  key: "userState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const subjectState = atom({
  key: "subjectState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const RecoilProvider = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
