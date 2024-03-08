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

export const RACES = ["Neutral", "Caucasian", "African american", "Southeast asian", "Northeast asian", "Other"];

export const CONDITIONS = {
  NORMAL: {
    title: "Normal",
    en: "Your pulmonary function is normal based on the doctor's opinion. Always pay attention to your respiratory health and get tested to maintain current condition.",
    ko: "폐기능 소견상 정상입니다. 항상 호흡기건강에 유의하시고 자주 검사를 받으시어 지금 상태를 유지하세요.",
    guide: "subject.p.dr_0",
  },
  NORMAL_OBSTRUCTIVE: {
    title: "Normal Obstructive",
    en: "You are suspected of small airway closure. Be avoided from smoking, indirect smoking, and micro dust, get tested frequently since you are likely to get COPD(asthma, emphysema, chronic bronchitis), and always pay attention to your respiratory health.",
    ko: "수검자님은 소기도폐쇄가 의심됩니다. 흡연, 간접흡연, 미세먼지등을 피하시고 만성폐쇄성폐질환(천식, 폐기종, 만성기관지염)으로 진행될 가능성이 높으니 폐기능 검사를 자주받으시고 항상 호흡기건강에 유의하시길 바랍니다.",
    guide: "subject.p.dr_1",
  },
  RESTRICTED: {
    title: "Restricted",
    en: "Restricted ventilation disorder is suspected. Restricted ventilation disorder includes pneumoconiosis, pneumonia, and lung cancer. Consult with a doctor to be properly cared for.",
    ko: "제한성 환기장애가 의심됩니다. 제한성환기장애는 진폐증, 폐렴, 폐암등이 있습니다. 진료의사와 상담하시어 적절히 관리받으시길바랍니다.",
    guide: "subject.p.dr_2",
  },
  OBSTRUCTIVE_MILD: {
    title: "Obstructive Mild",
    en: "Mild case of obstructive ventilatory disorder is suspected. Obstructive ventilation disorder includes asthma, emphysema, and chronic bronchitis. Consult with a doctor to be properly cared for.",
    ko: "폐쇄성환기장애 경증이 의심됩니다. 폐쇄성환기장애에는 천식, 폐기종, 만성기관지염 등이 있습니다. 진료의사와 상담하시어 적절히 관리받으시길바랍니다.",
    guide: "subject.p.dr_3",
  },
  OBSTRUCTIVE_ABNORMAL: {
    title: "Obstructive Abnormal",
    en: "Moderate case of obstructive ventilatory disorder is suspected. Obstructive ventilation disorder includes asthma, emphysema, and chronic bronchitis. Consult with a doctor to be properly cared for.",
    ko: "폐쇄성환기장애 중등도정도로 의심됩니다. 폐쇄성환기장애에는 천식, 폐기종, 만성기관지염 등이 있습니다. 진료의사와 상담하시어 적절히 관리받으시길 바랍니다.",
    guide: "subject.p.dr_4",
  },
  OBSTRUCTIVE_MODERATE: {
    title: "Obstructive Moderate",
    en: "Moderately severe case of obstructive ventilatory disorder is suspected. Obstructive ventilatory disorder includes asthma, emphysema, and chronic bronchitis. Consult with a doctor to be properly cared for.",
    ko: "폐쇄성환기장애 중등중증으로 의심됩니다. 폐쇄성환기장애에는 천식, 폐기종, 만성기관지염 등이 있습니다. 진료의사와 상담하시어 적절히 관리받으시길 바랍니다.",
    guide: "subject.p.dr_5",
  },
  OBSTRUCTIVE_SEVERE: {
    title: "Obstructive Severe",
    en: "Severe case of obstructive ventilatory disorder is suspected. Obstructive ventilatory disorder includes asthma, emphysema, and chronic bronchitis. Consult with a doctor to be properly cared for.",
    ko: "폐쇄성환기장애 중증으로 의심됩니다. 폐쇄성환기장애에는 천식, 폐기종, 만성기관지염 등이 있습니다. 진료의사와 상담하시어 적절히 관리받으시길 바랍니다.",
    guide: "subject.p.dr_6",
  },
  OBSTRUCTIVE_VERY_SEVERE: {
    title: "Obstructive Very Severe",
    en: "Highly severe case of obstructive ventilatory disorder is suspected. Obstructive ventilatory disorder includes asthma, emphysema, and chronic bronchitis. Consult with a doctor to be properly cared for.",
    ko: "폐쇄성환기장애 매우중증으로 의심됩니다. 폐쇄성환기장애에는 천식, 폐기종, 만성기관지염 등이 있습니다. 진료의사와 상담하시어 적절히 관리받으시길 바랍니다.",
    guide: "subject.p.dr_7",
  },
  MIXED: {
    title: "Mixed",
    en: 'When diagnosed with mixed pulmonary disease, "Mixed pulmonary disease is suspected. Get detailed diagnosis from the specialist.”',
    ko: "혼합성 폐질환이 의심됩니다. 의료진에게 상세 진단을 받아 보시길 바랍니다.",
    guide: "subject.p.dr_8",
  },
  ASTHMA: {
    title: "Asthma",
    en: 'When Asthma is suspected, "Asthma is suspected as you are positive in bronchodilator test. Get detailed diagonosis from the specialist.”',
    ko: "기관지 확장제 양성으로 폐쇄성 폐질환이 의심됩니다. 이에 전문의와 상담해주시길바랍니다.",
    guide: "subject.p.dr_9",
  },
};

export const GRADES = {
  A: "subject.p.ml_0",
  B: "subject.p.ml_1",
  C: "subject.p.ml_2",
  D: "subject.p.ml_3",
  F: "subject.p.ml_4",
};

export const ERROR_CODE = {
  1: "subject.p.ec_0",
  2: "subject.p.ec_1",
  3: "subject.p.ec_2",
  4: "subject.p.ec_3",
  5: "subject.p.ec_4",
  6: "subject.p.ec_5",
};
