import { POSITION_GROUP } from "@/constants";

export const getPositionGroup = (position) => {
  return Object.keys(POSITION_GROUP).find((key) => POSITION_GROUP[key].includes(position));
};

export const getOverallColor = (colorMap, overall) => {
  const overallUnit = Math.floor(overall / 10) * 10;
  return colorMap[`over${overallUnit}`];
};

export const convertPriceFormat = (price) => {
  const priceStr = typeof price === "string" ? price : price.toString();
  return priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
