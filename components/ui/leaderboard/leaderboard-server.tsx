import Leaderboard from "@/components/ui/leaderboard/leaderboard";
import { getLeaderboard } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";

export default async function LeaderboardServer() {
  const supabase = await createClient();
  const leaderboardData = await Promise.resolve(getLeaderboard(supabase));

  return <Leaderboard data={leaderboardData} />;
}
