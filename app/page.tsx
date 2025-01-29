import MainModal from "@/components/ui/main-modal";
import QuestionCardSkeleton from "@/components/ui/questions-cards/question-card-skeleton";
import SignOutButton from "@/components/ui/signout-button";
import { createClient } from "@/lib/supabase/client";
import { getMotDuJour } from "@/lib/supabase/queries";
import { Suspense } from "react";

export default async function Home() {
  try {
    const supabase = createClient();

    const motDuJour = await getMotDuJour(supabase);
    console.log(motDuJour);

    // const motDuJour: MotDuJour[] = [
    //   {
    //     mot: "Quintessence 1",
    //     propositions: [
    //       "Cinquième tentative pour faire quelque chose",
    //       "Ce qu'il y a de plus raffiné, de plus subtil dans quelque chose",
    //       "Essence de carburant de qualité supérieure",
    //       "Partie la plus pure et la plus raffinée d'une substance",
    //     ],
    //     correct:
    //       "Ce qu'il y a de plus raffiné, de plus subtil dans quelque chose",
    //   },
    //   {
    //     mot: "Quintessence 2",
    //     propositions: [
    //       "Cinquième tentative pour faire quelque chose",
    //       "Ce qu'il y a de plus raffiné, de plus subtil dans quelque chose",
    //       "Essence de carburant de qualité supérieure",
    //       "Partie la plus pure et la plus raffinée d'une substance",
    //     ],
    //     correct:
    //       "Ce qu'il y a de plus raffiné, de plus subtil dans quelque chose",
    //   },
    //   {
    //     mot: "Quintessence 3",
    //     propositions: [
    //       "Cinquième tentative pour faire quelque chose",
    //       "Ce qu'il y a de plus raffiné, de plus subtil dans quelque chose",
    //       "Essence de carburant de qualité supérieure",
    //       "Partie la plus pure et la plus raffinée d'une substance",
    //     ],
    //     correct:
    //       "Ce qu'il y a de plus raffiné, de plus subtil dans quelque chose",
    //   },
    // ];

    if (!motDuJour) {
      return <div>No word of the day found</div>;
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-dvh p-4">
        <SignOutButton />
        <Suspense fallback={<QuestionCardSkeleton />}>
          <MainModal motDuJour={motDuJour} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Something went wrong</div>;
  }
}
