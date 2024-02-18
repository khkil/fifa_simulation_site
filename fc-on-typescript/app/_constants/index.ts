// 공통
import { PositionGroup } from "@/app/_types/position";

export const SUCCESS_STATUS: string = "success";
export const FAIL_STATUS: string = "fail";

export const LEFT_FOOT: string = "LEFT";
export const RIGHT_FOOT: string = "RIGHT";

export const DEFAULT_ERROR_MESSAGE: string = "데이터를 불러오는중 오류가 발생하였습니다.";

export const POSITION_GROUP: Record<
  string,
  {
    name: string;
    positions: string[];
  }
> = {
  gk: {
    name: "골키퍼",
    positions: ["GK"],
  },
  df: {
    name: "수비수",
    positions: ["SW", "RWB", "RB", "RCB", "CB", "LCB", "LB", "LWB"],
  },
  mf: {
    name: "미드필더",
    positions: ["RDM", "CDM", "LDM", "RM", "RCM", "CM", "LCM", "LM", "RAM", "CAM", "LAM"],
  },
  fw: {
    name: "공격수",
    positions: ["RF", "CF", "LF", "RW", "RS", "ST", "LS", "LW"],
  },
};

export const TRADE_TYPE_ALL: string = "all";
export const TRADE_TYPE_SELL: string = "sell";
export const TRADE_TYPE_BUY: string = "buy";

export const TRADE_TYPES = [
  { type: TRADE_TYPE_ALL, desc: "전체" },
  { type: TRADE_TYPE_BUY, desc: "구매" },
  { type: TRADE_TYPE_SELL, desc: "판매" },
];
