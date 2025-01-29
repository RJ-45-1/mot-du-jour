export type MotDuJour = {
  mot: string;
  propositions: string[];
  correct: string;
};
export type UserInfos = {
  id: string;
  done_mot_du_jour: boolean;
  streaks: number;
};
export type LeaderboardType = {
  name: string;
  streaks: number;
};
