// 공통
export const SUCCESS_STATUS = "success";
export const FAIL_STATUS = "fail";

export const LEFT_FOOT = "LEFT";
export const RIGHT_FOOT = "RIGHT";

export const POSITION_GROUP = {
  striker: ["RF", "CF", "LF", "RW", "RS", "ST", "LS", "LW"],
  midfielder: ["RDM", "CDM", "LDM", "RM", "RCM", "CM", "LCM", "LM", "RAM", "CAM", "LAM"],
  defender: ["SW", "RWB", "RB", "RCB", "CB", "LCB", "LB", "LWB"],
  goalKeeper: ["GK"],
};

export const TRADE_TYPE_ALL = "all";
export const TRADE_TYPE_SELL = "sell";
export const TRADE_TYPE_BUY = "buy";

export const TRADE_TYPES = [
  { type: TRADE_TYPE_ALL, desc: "전체" },
  { type: TRADE_TYPE_BUY, desc: "구매" },
  { type: TRADE_TYPE_SELL, desc: "판매" },
];
