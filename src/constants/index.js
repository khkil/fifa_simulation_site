// 공통
export const SUCCESS_STATUS = "success";
export const FAIL_STATUS = "fail";

export const LEFT_FOOT = "LEFT";
export const RIGHT_FOOT = "RIGHT";

export const POSITION_GROUP = {
  goalKeeper: {
    name: "골키퍼",
    positions: ["GK"],
  },
  defender: {
    name: "수비수",
    positions: ["SW", "RWB", "RB", "RCB", "CB", "LCB", "LB", "LWB"],
  },
  midfielder: {
    name: "미드필더",
    positions: ["RDM", "CDM", "LDM", "RM", "RCM", "CM", "LCM", "LM", "RAM", "CAM", "LAM"],
  },
  striker: {
    name: "공격수",
    positions: ["RF", "CF", "LF", "RW", "RS", "ST", "LS", "LW"],
  },
};

export const TRADE_TYPE_ALL = "all";
export const TRADE_TYPE_SELL = "sell";
export const TRADE_TYPE_BUY = "buy";

export const TRADE_TYPES = [
  { type: TRADE_TYPE_ALL, desc: "전체" },
  { type: TRADE_TYPE_BUY, desc: "구매" },
  { type: TRADE_TYPE_SELL, desc: "판매" },
];
