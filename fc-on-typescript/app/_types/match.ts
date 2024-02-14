export declare type MatchUser = {
  nickname: string;
  matchResult: string;
  goal: number;
  controller: string;
};

type MatchInfo = {
  nickname: string;
  matchDetail: {
    matchResult: string;
    matchEndType: number;
    controller: string;
    cornerKink: 1;
    foul: number;
    offsideCount: number;
    yellowCards: number;
    redCards: number;
    injury: number;
  };
  shoot: {
    shootTotal: number;
    effectiveShootTotal: number;
    goalTotal: number;
    pass: {
      passTry: number;
      passSuccess: number;
    };
    defence: {
      tackleTry: number;
      tackleSuccess: number;
    };
    player: {
      spId: number;
      name: string;
      seasonId: number;
      seasonImageUrl: string;
      spPosition: number;
      positionName: string;
      spGrade: number;
      price: number;
    }[];
  };
};
export default interface Match {
  matchId: string;
  matchDate: string;
  matchType: number;
  users?: MatchUser[];
  matchInfo?: MatchInfo[];
}
