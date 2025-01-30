"use client";
import DailyQuestionCard from "@/components/ui/questions-cards/daily-question-card";
import Response from "@/components/ui/questions-cards/response";
import { createClient } from "@/lib/supabase/client";
import { MotDuJour, UserInfos } from "@/types";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Evaluation from "./questions-cards/evaluation";
import QuestionCardSkeleton from "./questions-cards/question-card-skeleton";

export default function MainModal({ motDuJour }: { motDuJour: MotDuJour[] }) {
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      const { data: userInfos, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.data.user?.id)
        .single();

      if (userInfos) {
        setUserInfos(userInfos as UserInfos);
      }
      if (userInfos.done_mot_du_jour) {
        return redirect("/leaderboard");
      }
    };
    getUser();
  }, []);

  const [selectedProposition, setSelectedProposition] = useState<string | null>(
    null,
  );
  const [userInfos, setUserInfos] = useState<UserInfos>();

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
          } else {
            const { error } = await supabase
              .from("users")
              .update([{ streaks: 0, done_mot_du_jour: true }])
              .eq("id", userInfos?.id);
          }
        }
        setIsCorrect(false);
      }
      setIsSubmitting(false);
      setValidated(true);
    }
  };
  if (userInfos) {
    return (
      <>
        {userInfos && !userInfos.done_mot_du_jour ? (
          motDuJour.length === 1 ? (
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
          )
        ) : (
          <QuestionCardSkeleton />
        )}
      </>
    );
  }
}
