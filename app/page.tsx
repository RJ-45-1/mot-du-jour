import MainModal from "@/components/ui/main-modal";
import QuestionCardSkeleton from "@/components/ui/question-card-skeleton";
import { createClient } from "@/utils/supabase/client";
import { getMotDuJour } from "@/utils/supabase/queries";
import { Suspense } from "react";

export default async function Home() {
  try {
    const supabase = createClient();
    const motDuJour = await getMotDuJour(supabase);

    if (!motDuJour) {
      return <div>No word of the day found</div>;
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-dvh p-4">
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
