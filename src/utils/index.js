import { POSITION_GROUP } from "@/constants";

export const getPositionGroup = (position) => {
  return Object.keys(POSITION_GROUP).find((key) => POSITION_GROUP[key].includes(position));
};

export const getOverallColor = (colorMap, overall) => {
  const overallUnit = Math.floor(overall / 10) * 10;
  return colorMap[`over${overallUnit}`];
};

export const getPlusStatFromUpgradeValue = (upgradeValue) => {
  switch (upgradeValue) {
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
  const priceStr = typeof price === "string" ? price : price.toString();
  return priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
