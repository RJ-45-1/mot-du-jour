"use client";
import DailyQuestionCard from "@/components/ui/questions-cards/daily-question-card";
import Response from "@/components/ui/questions-cards/response";
import { useUser } from "@/hooks/use-user";
import { createClient } from "@/lib/supabase/client";
import { MotDuJour } from "@/types";
import { redirect } from "next/navigation";
import { useState } from "react";
import Evaluation from "./questions-cards/evaluation";
import QuestionCardSkeleton from "./questions-cards/question-card-skeleton";

export default function MainModal({ motDuJour }: { motDuJour: MotDuJour[] }) {
  const supabase = createClient();

  const [selectedProposition, setSelectedProposition] = useState<string | null>(
    null,
  );
  const { userInfos, isLoading, error } = useUser();

  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handlePropositionSelected = (proposition: string) => {
    if (proposition === selectedProposition) {
      setSelectedProposition(null);
    } else {
      setSelectedProposition(proposition);
    }
  };

  const handleSubmit = async () => {
    if (userInfos) {
      setIsSubmitting(true);

      if (selectedProposition === motDuJour[0].correct) {
        const { data, error } = await supabase
          .from("users")
          .update([{ streaks: userInfos.streaks + 1, done_mot_du_jour: true }])
          .eq("id", userInfos?.id);
        if (error) {
          console.log(error);
        }
        setIsCorrect(true);
      } else {
        if (userInfos.streaks >= 1) {
          const { error } = await supabase
            .from("users")
            .update([
              { streaks: userInfos.streaks - 1, done_mot_du_jour: true },
            ])
            .eq("id", userInfos?.id);

          if (error) {
            console.log(error);
          }
        } else {
          const { error } = await supabase
            .from("users")
            .update([{ streaks: 0, done_mot_du_jour: true }])
            .eq("id", userInfos?.id);
          if (error) {
            console.log(error);
          }
        }
        setIsCorrect(false);
      }
      setIsSubmitting(false);
      setValidated(true);
    }
  };
  if (isLoading) return <QuestionCardSkeleton />;
  if (error) return <div>Error loading user data</div>;
  if (userInfos?.done_mot_du_jour) {
    redirect("/leaderboard");
    return null;
  }
  if (userInfos) {
    return (
      <>
        {motDuJour.length === 1 ? (
          <>
            <DailyQuestionCard
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
              motDuJour={motDuJour[0]}
              selectedProposition={selectedProposition}
              handlePropositionSelected={handlePropositionSelected}
            />
            {validated && (
              <Response
                streaks={userInfos.streaks}
                correctAnswer={motDuJour[0].correct}
                setValidated={() => setValidated(false)}
                isCorrect={isCorrect}
              />
            )}
          </>
        ) : (
          <Evaluation motDuJour={motDuJour} userInfos={userInfos} />
        )}
      </>
    );
  }
}
