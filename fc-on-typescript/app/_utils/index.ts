import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { POSITION_GROUP } from "../_constants";

export const getPositionGroupByPosition = (position: string) => {
  return Object.keys(POSITION_GROUP).find((key) => POSITION_GROUP[key].positions.includes(position));
};

export const getPercentage = (part: number, whole: number): number => {
  if (part == 0 || whole == 0) return 0;
  return parseFloat(((part / whole) * 100).toFixed(1));
};

export const getPlusOverallFromGrade = (grade: number): number => {
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

export const upgradeValue = () => {
  const minOverall = -5; // 강화 오버롤 기준 -5
};
