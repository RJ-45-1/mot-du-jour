import { MotDuJour } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

export const getMotDuJour = cache(async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.rpc("get_mot_du_jour");

  if (error) {
    console.log(error);
  } else if (data) {
    return data as MotDuJour;
  }
});

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});
