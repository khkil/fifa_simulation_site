export declare type MatchUser = {
  nickname: string;
  matchResult: string;
  goal: number;
  controller: string;
};

export declare type MatchPlayer = {
  spId: number;
  name: string;
  seasonId: number;
  seasonImageUrl: string;
  spPosition: number;
  positionName: string;
  spGrade: number;
  price: number;
  status: {
    spRating: number;
    goal: number;
    shoot: number;
    passTry: number;
    passSuccess: number;
    dribbleTry: number;
    dribbleSuccess: number;
    aerialTry: number;
    aerialSuccess: number;
    blockTry: number;
    block: number;
    tackleTry: number;
    tackle: number;
  };
};

export declare type MatchInfo = {
  nickname: string;
  matchDetail: {
    matchResult: string;
    matchEndType: number;
    controller: string;
    possession: number;
    cornerKink: number;
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
  };
  pass: {
    passTry: number;
    passSuccess: number;
  };
  defence: {
    tackleTry: number;
    tackleSuccess: number;
  };
  player: MatchPlayer[];
};
export default interface Match {
  matchId: string;
  matchDate: string;
  matchType: number;
  users?: MatchUser[];
  matchInfo?: MatchInfo[];
}
