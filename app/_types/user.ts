export declare type Player = {
  spid: number;
  pid: number;
  name: string;
  role: string;
  ovr: number;
  pay: number;
  buildUp: number;
  price: string;
  thumb: string;
  x: number;
  y: number;
};

export declare type TeamColor = {
  lv: number;
  name: string;
  image: string;
  skill: string;
  playercnt: number;
  playerlist: number[];
};

export declare type Overall = {
  df: number;
  fw: number;
  mf: number;
  total?: number;
};

export declare type TotalPrice = {
  totalPrice: number;
  date: string;
};
export declare interface UserSquad {
  formation: string;
  maintotalPrice: string;
  totalPay: number;
  ovr: Overall;
  players: Player[];
  totalTeamColor: {
    affiliation: Record<string, TeamColor>;
    enhance: Record<string, TeamColor>;
  };
  totalPriceList: TotalPrice[];
}
