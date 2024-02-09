import { Season } from "@/app/_types/season";

interface PlayerPrice {
  grade: number;
  price: number;
}

export declare interface Player {
  spId: number;
  playerName: string;
  pay: number;
  leftFoot: number;
  rightFoot: number;
  maxOverall: number;
  average: {
    speed: number;
    shooting: number;
    passing: number;
    dribble: number;
    defending: number;
    physical: number;
  };
  season: Season;
  priceList: PlayerPrice[];
  positions: Position[];
}

export declare interface Position {
  positionName: string;
  overall: number;
}

export declare interface PlayerPriceRank {
  percentage: number;
  playerId: number;
  playerName: string;
  seasonImgUrl: string;
  todayPrice: number;
  yesterdayPrice: number;
}

export declare interface PlayerSearchParams {
  clubIds?: number[];
  skillIds?: number[];
  seasonIds?: number[];
  nationIds?: number[];
  name?: string;
}
