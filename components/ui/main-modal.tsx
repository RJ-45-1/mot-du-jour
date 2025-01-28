"use client";
import { MotDuJour } from "@/types";
import { useState } from "react";
import QuestionCard from "./question-card";
import Response from "./response";

export default function MainModal({ motDuJour }: { motDuJour: MotDuJour }) {
  const [selectedProposition, setSelectedProposition] = useState<string | null>(
    null,
  );
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  const handlePropositionSelected = (proposition: string) => {
    if (proposition === selectedProposition) {
      setSelectedProposition(null);
    } else {
      setSelectedProposition(proposition);
    }
  };

  const handleSubmit = () => {
    setValidated(true);
    if (selectedProposition === motDuJour.correct) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };
  return (
    <>
      <QuestionCard
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
