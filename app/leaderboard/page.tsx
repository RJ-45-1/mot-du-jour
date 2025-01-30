import LeaderboardServer from "@/components/ui/leaderboard/leaderboard-server";
import LeaderboardSkeleton from "@/components/ui/leaderboard/leaderboard-skeleton";
import SignOutButton from "@/components/ui/signout-button";

import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4">
      <SignOutButton />
      {/* <LeaderboardSkeleton /> */}
      <Suspense fallback={<LeaderboardSkeleton />}>
        <LeaderboardServer />
      </Suspense>
    </div>
  );
}
