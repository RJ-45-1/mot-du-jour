"use client";
import { createClient } from "@/lib/supabase/client";
import { MotDuJour } from "@/types";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import QuestionCard from "./question-card";
import Response from "./response";

type UserInfos = {
  id: string;
  done_mot_du_jour: boolean;
  streaks: number;
};

export default function MainModal({ motDuJour }: { motDuJour: MotDuJour }) {
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
    console.log("correct : ", motDuJour.correct);
    console.log("selected : ", selectedProposition);
    if (userInfos) {
      setIsSubmitting(true);

      if (selectedProposition === motDuJour.correct) {
        const { data, error } = await supabase
          .from("users")
          .update([{ streaks: userInfos.streaks + 1, done_mot_du_jour: true }])
          .eq("id", userInfos?.id);
        if (error) {
          console.log(error);
        }
        setIsCorrect(true);
      } else {
        const { error } = await supabase
          .from("users")
          .update([{ streaks: 0, done_mot_du_jour: true }])
          .eq("id", userInfos?.id);
        if (error) {
          console.log(error);
        }
        setIsCorrect(false);
      }
      setIsSubmitting(false);
      setValidated(true);
    }
  };
  return (
    <>
      {userInfos && !userInfos.done_mot_du_jour && (
        <>
          <QuestionCard
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            motDuJour={motDuJour}
            selectedProposition={selectedProposition}
            handlePropositionSelected={handlePropositionSelected}
          />
          {validated && (
            <Response
              streaks={userInfos.streaks}
              correctAnswer={motDuJour.correct}
              setValidated={() => setValidated(false)}
              isCorrect={isCorrect}
            />
          )}
        </>
      )}
    </>
  );
}
