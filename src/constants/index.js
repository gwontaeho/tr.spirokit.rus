export const LOCALES = [
  { label: "KO", value: "ko" },
  { label: "EN", value: "en" },
  { label: "RU", value: "ru" },
];

export const TITLES_RESULT_FVC = [
  { title: "FVC", unit: "L" },
  { title: "FEV500ms", unit: "L" },
  { title: "FEV1", unit: "L" },
  { title: "FEV2", unit: "L" },
  { title: "FEV3", unit: "L" },
  { title: "FEV4", unit: "L" },
  { title: "FEV5", unit: "L" },
  { title: "FEV6", unit: "L" },
  { title: "FET", unit: "s" },
  { title: "PEF", unit: "L/s" },
  { title: "PEFT", unit: "s" },
  { title: "FEV1PER", unit: "%" },
  { title: "MEF25", unit: "L/s" },
  { title: "MEF50", unit: "L/s" },
  { title: "MEF75", unit: "L/s" },
  { title: "FEF25_75", unit: "L/s" },
  { title: "FEF25_50", unit: "L/s" },
  { title: "FEF50_75", unit: "L/s" },
  { title: "FEF75_85", unit: "L/s" },
  { title: "FEF200_1200ml", unit: "L/s" },
  { title: "VEXT", unit: "ml" },
  { title: "FIVC", unit: "L" },
  { title: "FIV500ms", unit: "L" },
  { title: "FIV1", unit: "L" },
  { title: "FIV2", unit: "L" },
  { title: "FIV3", unit: "L" },
  { title: "FIV6", unit: "L" },
  { title: "FIT", unit: "" },
  { title: "PIF", unit: "L/s" },
  { title: "PIFT", unit: "s" },
  { title: "MIF25", unit: "L/s" },
  { title: "MIF50", unit: "L/s" },
  { title: "MIF75", unit: "L/s" },
  { title: "FIF25_75", unit: "L/s" },
  { title: "FIF25_50", unit: "L/s" },
  { title: "FIF50_75", unit: "L/s" },
  { title: "FIF75_85", unit: "L/s" },
  { title: "FIF200_1200ml", unit: "L/s" },
];

export const TITLES_RESULT_SVC = [
  { title: "ERV", unit: "L" },
  { title: "IRV", unit: "L" },
  { title: "VC", unit: "L" },
  { title: "IC", unit: "L" },
];

export const COLORS_GRAPH = [
  "#0180BE",
  "#869FF0",
  "#53D9E8",
  "#04A283",
  "#6CDCB6",
  "#FFB98B",
  "#FF7C7C",
  "#EB8DEB",
  "#C3CAD2",
  "#606060",
];

export const RACES = [
  "Neutral",
  "Caucasian",
  "African american",
  "Southeast asian",
  "Northeast asian",
  "Other",
];

export const CONDITIONS = {
  NORMAL: {
    title: "Normal",
    result: "PJ.DR_0",
    guide: "PJ.DD_0",
  },
  NORMAL_OBSTRUCTIVE: {
    title: "Normal Obstructive",
    result: "PJ.DR_1",
    guide: "PJ.DD_1",
  },
  RESTRICTED: {
    title: "Restricted",
    result: "PJ.DR_2",
    guide: "PJ.DD_2",
  },
  OBSTRUCTIVE_MILD: {
    title: "Obstructive Mild",
    result: "PJ.DR_3",
    guide: "PJ.DD_3",
  },
  OBSTRUCTIVE_ABNORMAL: {
    title: "Obstructive Abnormal",
    result: "PJ.DR_4",
    guide: "PJ.DD_4",
  },
  OBSTRUCTIVE_MODERATE: {
    title: "Obstructive Moderate",
    result: "PJ.DR_5",
    guide: "PJ.DD_5",
  },
  OBSTRUCTIVE_SEVERE: {
    title: "Obstructive Severe",
    result: "PJ.DR_6",
    guide: "PJ.DD_6",
  },
  OBSTRUCTIVE_VERY_SEVERE: {
    title: "Obstructive Very Severe",
    result: "PJ.DR_7",
    guide: "PJ.DD_7",
  },
  MIXED: {
    title: "Mixed",
    result: "PJ.DR_8",
    guide: "PJ.DD_8",
  },
  ASTHMA: {
    title: "Asthma",
    result: "PJ.DR_9",
    guide: "PJ.DD_9",
  },
};

export const GRADES = {
  A: "PJ.G_0",
  B: "PJ.G_1",
  C: "PJ.G_2",
  D: "PJ.G_3",
  F: "PJ.G_4",
};

export const ERROR_CODE = {
  1: "PJ.ERR_0",
  2: "PJ.ERR_1",
  3: "PJ.ERR_2",
  4: "PJ.ERR_3",
  5: "PJ.ERR_4",
  6: "PJ.ERR_5",
};
