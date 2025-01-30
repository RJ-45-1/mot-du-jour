import { MotDuJourServer } from "@/components/ui/mot-du-jour-server";
import QuestionCardSkeleton from "@/components/ui/questions-cards/question-card-skeleton";
import SignOutButton from "@/components/ui/signout-button";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4">
      <SignOutButton />
      <Suspense fallback={<QuestionCardSkeleton />}>
        <MotDuJourServer />
      </Suspense>
    </div>
  );
}
