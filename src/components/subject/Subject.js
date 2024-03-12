"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const Subject = ({ data }) => {
  const { t } = useTranslation();

  const { chartNumber, name, birthday, gender, subjectDetails = {} } = data;
  const {
    weight,
    height,
    smoking,
    smokingExperience,
    smokingPackYear,
    smokingStartAge,
    smokingStopAge,
  } = subjectDetails;
  const period = smokingExperience
    ? !!smokingStopAge
      ? `${Number(smokingStopAge) - Number(smokingStartAge)}년`
      : `${
          new Date().getFullYear() -
          Number(birthday.slice(0, 4)) +
          1 -
          Number(smokingStartAge)
        }년`
    : "-";

  const GENDERS = { m: "남", f: "여" };

  return (
    <section className="card w-80">
      <div className="p-4 font-medium">{t("PJ.SUB_INFO")}</div>
      <div className="p-4 flex flex-col text-sm space-y-4 [&>div]:flex [&>div]:items-center [&>div>span]:w-32 [&>div>span]:text-gray-400">
        <div>
          <span>{t("PJ.CN")}</span>
          <p>{chartNumber}</p>
        </div>
        <div>
          <span>{t("PJ.NM")}</span>
          <p>{name}</p>
        </div>
        <div>
          <span>{t("PJ.DOB")}</span>
          <p>{birthday}</p>
        </div>
        <div>
          <span>{t("PJ.SEX")}</span>
          <p>{t(`PJ.${gender.toUpperCase()}`)}</p>
        </div>
        <div>
          <span>{t("PJ.WGHT")}</span>
          <p>{weight} kg</p>
        </div>
        <div>
          <span>{t("PJ.HGHT")}</span>
          <p>{height} cm</p>
        </div>
        <div>
          <span>{t("PJ.XP")}</span>
          <p>{smokingExperience ? t("PJ.Y") : t("PJ.N")}</p>
        </div>
        <div>
          <span>{t("PJ.CURR")}</span>
          <p>{smokingExperience ? (smoking ? t("PJ.Y") : t("PJ.Y")) : "-"}</p>
        </div>
        <div>
          <span>{t("PJ.PACK_Y")}</span>
          <p>{!!smokingPackYear ? `${smokingPackYear}${t("PJ.PACK")}` : "-"}</p>
        </div>
        <div>
          <span>{t("PJ.SMK_PRD")}</span>
          <p>{period}</p>
        </div>
        <Link href={`/subjects/${chartNumber}/update`}>
          <button className="input h-8 w-full">{t("PJ.MODIFY")}</button>
        </Link>
      </div>
    </section>
  );
};
