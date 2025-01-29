import Leaderboard from "@/components/ui/leaderboard/leaderboard";
import LeaderboardSkeleton from "@/components/ui/leaderboard/leaderboard-skeleton";
import SignOutButton from "@/components/ui/signout-button";
import { createClient } from "@/lib/supabase/client";
import { getLeaderboard } from "@/lib/supabase/queries";
import { Suspense } from "react";

export default async function Page() {
  const supabase = createClient();
  const leaderboardData = await Promise.resolve(getLeaderboard(supabase));

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4">
      <SignOutButton />
      {/* <LeaderboardSkeleton /> */}
      <Suspense fallback={<LeaderboardSkeleton />}>
        <Leaderboard data={leaderboardData} />
      </Suspense>
    </div>
  );
}
