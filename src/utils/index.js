import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { POSITION_GROUP } from "@/constants";

export const getPositionGroup = (position) => {
  return Object.keys(POSITION_GROUP).find((key) => POSITION_GROUP[key].positions.includes(position));
};

export const getOverallColor = (colorMap, overall) => {
  const overallUnit = Math.floor(overall / 10) * 10;
  return colorMap[`over${overallUnit}`];
};

export const getPlusStatFromGrade = (grade) => {
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

export const convertPriceFormat = (price) => {
  if (!price) return 0;
  const priceStr = typeof price === "string" ? price : price.toString();
  return priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const convertDateFormat = (date) => {
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
