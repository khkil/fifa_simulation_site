import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { POSITION_GROUP } from "../_constants";

export const getPositionGroup = (position) => {
  return Object.keys(POSITION_GROUP).find((key) => POSITION_GROUP[key].positions.includes(position));
};

export const getOverallColor = (colorMap, overall) => {
  const overallUnit = Math.floor(overall / 10) * 10;
  return colorMap[`over${overallUnit}`];
};

export const getPlusOverallFromGrade = (grade: number) => {
  switch (grade) {
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
      return 4;
    case 5:
      return 6;
    case 6:
      return 8;
    case 7:
      return 11;
    case 8:
      return 15;
    case 9:
      return 19;
    case 10:
      return 24;
    default:
      return 0;
  }
};

export const convertPriceFormat = (price: number | string): string => {
  if (!price) return "0";
  const priceStr = typeof price === "string" ? price : price.toString();
  return priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const convertKorPriceFormat = (price: number | string): string => {
  const koreanUnits = ["조", "억", "만", "원"];
  let answer = "";
  if (typeof price === "string") {
    price = Number(price.replaceAll(",", ""));
  }

  while (price > 0) {
    const mod = price % 10000;
    const modToString = mod.toString().replace(/(\d)(\d{3})/, "$1,$2");
    price = Math.floor(price / 10000);

    const unit = koreanUnits.pop();
    if (mod > 0) {
      answer = `${modToString}${unit} ${answer}`;
    }
  }
  return answer.trim();
};

export const convertDateFormat = (date: string) => {
  const d = new Date(date);
  const now = Date.now();
  const minute = ((now - d.getTime()) / 1000) * 60; // 현재 시간과의 차이(초)
  if (minute < 10) {
    // 10분 미만일땐  {minute} 전 표기
    return `${minute}분 전`;
  }
  /* if (diff < 60 * 60 * 24 * 3) {
    // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  } */
  return format(d, "PPP EEE p", { locale: ko }); // 날짜 포맷
};

export const getPercentage = (part, whole) => {
  if (part == 0 || whole == 0) return 0;
  return parseFloat(((part / whole) * 100).toFixed(1));
};

export const upgradeValue = () => {
  const minOverall = -5; // 강화 오버롤 기준 -5

  const maxGauge = 5;

  // 강화 게이지
  const gauges = [
    [0.81, 0.81, 1.07, 1.42, 1.88, 2.5, 3.31, 4.39, 5, 5, 5, 5], // 1 > 2
    [0, 0.54, 0.71, 0.94, 1.25, 1.66, 2.2, 2.93, 3.89, 5, 5, 5], // 2 > 3
    [0, 0, 0.53, 0.71, 0.94, 1.25, 1.65, 2.2, 2.92, 3.88, 5, 5], // 3 > 4
    [0, 0, 0, 0.57, 0.75, 1, 1.33, 1.67, 2.34, 3.12, 4.15, 5], // 4 > 5
    [0, 0, 0, 0.57, 0.75, 0.99, 1.33, 1.77, 2.35, 3.13, 4.16, 5], // 5 > 6
    [0, 0, 0, 0.57, 0.75, 0.99, 1.33, 1.77, 2.36, 3.14, 4.18, 5], // 6 > 7
    [0, 0, 0, 0.57, 0.75, 0.99, 1.33, 1.77, 2.36, 3.16, 4.21, 5], // 7 > 8
  ];
};
