import { LeaderboardType, MotDuJour } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

export const getMotDuJour = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.rpc("get_mot_du_jour");

  if (error) {
    console.log(error);
  } else if (data) {
    return data as MotDuJour;
  }
};

export const getLeaderboard = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.rpc("get_leaderboard");

  if (error) {
    console.log(error);
  } else if (data) {
    return data as LeaderboardType[];
  }
};

export const getUser = async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
