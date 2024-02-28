import { Season } from "@/app/_types/season";
import { number } from "prop-types";

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
  overall?: number;
}

export declare interface skill {
  id: number;
  skillName: string;
}

export declare interface club {
  id: number;
  clubName: string;
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

export declare type UpgradeTargetPlayer = {
  playerId: number;
  grade: number;
  overall: number;
  playerName: string;
  season: Season;
  priceList: PlayerPrice[];
  positions: Position[];
};

export declare interface IngredientPlayer {
  spId: number;
  playerName: string;
  overall: number;
  price: number;
  grade: number;
  season: Season;
  positions: Position[];
}
