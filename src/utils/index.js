import { POSITION_GROUP } from "@/constants";

export const getPositionGroup = (position) => {
  return Object.keys(POSITION_GROUP).find((key) => POSITION_GROUP[key].includes(position));
};
