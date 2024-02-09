type Player = {
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

export declare interface UserSquad {
  formation: string;
  maintotalPrice: string;
  totalPay: number;
  ovr: {
    df: number;
    fw: number;
    mf: number;
    total: number;
  };
  players: Player[];
}
