export declare type MatchUser = {
  nickname: string;
  matchResult: string;
  goal: number;
  controller: string;
};
export default interface Match {
  matchId: string;
  matchDate: string;
  matchType: number;
  users: MatchUser[];
}
