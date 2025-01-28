"use client";
import { createClient } from "@/lib/supabase/client";
import { MotDuJour } from "@/types";
import { useState } from "react";
import QuestionCard from "./question-card";
import Response from "./response";

export default function MainModal({
  motDuJour,
  userInfo,
}: {
  motDuJour: MotDuJour;
  userInfo: any;
}) {
  const supabase = createClient();

  const [selectedProposition, setSelectedProposition] = useState<string | null>(
    null,
  );
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
    setIsSubmitting(true);

    if (selectedProposition === motDuJour.correct) {
      const { data, error } = await supabase
        .from("users")
        .update([{ streaks: 1, done_mot_du_jour: true }])
        .eq("id", userInfo.user.id);
      setIsCorrect(true);
      if (error) {
        console.log(error);
      }
    } else {
      const { error } = await supabase
        .from("users")
        .update([{ streaks: 0, done_mot_du_jour: true }])
        .eq("id", userInfo.user.id);
      setIsCorrect(false);
      if (error) {
        console.log(error);
      }
    }
    setIsSubmitting(false);
    setValidated(true);
  };
  return (
    <>
      <QuestionCard
        isSubmitting={isSubmitting}
        handleSubmit={() => handleSubmit()}
        motDuJour={motDuJour}
        selectedProposition={selectedProposition}
        handlePropositionSelected={handlePropositionSelected}
      />
      {validated && (
        <Response
          correctAnswer={motDuJour.correct}
          setValidated={() => setValidated(false)}
          isCorrect={isCorrect}
        />
      )}
    </>
  );
}
