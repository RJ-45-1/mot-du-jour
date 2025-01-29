"use client";
import { createClient } from "@/lib/supabase/client";
import { MotDuJour, UserInfos } from "@/types";
import { ArrowRight, Loader2, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import EvaluationResults from "./evaluation-results";

function getScore({
  motDuJour,
  responses,
}: {
  motDuJour: MotDuJour[];
  responses: string[];
}) {
  let score = 0;
  for (let i = 0; i < responses.length; i++) {
    if (responses[i] === motDuJour[i].correct) {
      score = score + 1;
    }
  }
  return score;
}

export default function Evaluation({
  motDuJour,
  userInfos,
}: {
  motDuJour: MotDuJour[];
  userInfos: UserInfos;
}) {
  const supabase = createClient();

  const [currentMotIndex, setCurrentMotIndex] = useState<number>(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedProposition, setSelectedProposition] = useState<string>("");

  const [showResults, setShowResults] = useState<boolean>(false);

  const handlePropositionSelected = (proposition: string) => {
    if (proposition === selectedProposition) {
      setSelectedProposition("");
    } else {
      setSelectedProposition(proposition);
    }
  };

  useEffect(() => {
    console.log(responses);
  }, [responses]);

  const handleSubmit = async () => {
    console.log("curentIndex : ", currentMotIndex);
    console.log("len : ", motDuJour.length);
    setIsSubmitting(true);
    if (currentMotIndex < motDuJour.length - 1) {
      setCurrentMotIndex(currentMotIndex + 1);
      setResponses((prev) => [...prev, selectedProposition]);
      setSelectedProposition("");
    } else {
      const score = getScore({ responses, motDuJour });
      setShowResults(true);
      setResponses((prev) => [...prev, selectedProposition]);
      const { data, error } = await supabase
        .from("users")
        .update([
          { streaks: userInfos.streaks + score, done_mot_du_jour: true },
        ])
        .eq("id", userInfos?.id);
      if (error) {
        console.log(error);
      }
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <Card className="w-full md:w-2/3">
        <CardHeader>
          <CardTitle className="flex flex-row justify-center items-center text-sm md:text-lg">
            <NotebookPen className="mr-2 text-primary" /> Le mot{" "}
            {currentMotIndex + 1} / {motDuJour.length}:
            <p className="text-sm md:text-lg ml-2 underline">
              {motDuJour[currentMotIndex].mot}
            </p>
          </CardTitle>
          <CardTitle className="flex flex-row justify-center items-center">
            <p className="text-sm md:text-base">Qui signifie ...</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {motDuJour[currentMotIndex].propositions.map((proposition, key) => (
              <Button
                className={`${proposition === selectedProposition ? "bg-primary/30 hover:bg-primary/30 text-accent-foreground" : ""} md:w-3/4 w-full`}
                key={key}
                variant={"outline"}
                onClick={() => handlePropositionSelected(proposition)}
              >
                <p className="text-xs md:text-base text-wrap">{proposition}</p>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-row justify-center">
          <Button
            disabled={selectedProposition.length === 0}
            onClick={() => handleSubmit()}
          >
            {isSubmitting && <Loader2 className="animate-spin ml-2" />}
            <p className="text-sm md:text-base">Valider</p>
          </Button>
        </CardFooter>
      </Card>
      {showResults && (
        <div className="fixed inset-0 z-50 bg-black/30 animate-fadeIn ">
          <div
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg animate-modalSlideIn max-h-[400px] overflow-y-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row justify-between w-full">
              <p>
                Score : {getScore({ motDuJour, responses })} /{" "}
                {responses.length}
              </p>
              <button
                className="p-2"
                onClick={() => (window.location.href = "/")}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {responses.map((response, index) =>
              response === motDuJour[index].correct ? (
                <EvaluationResults
                  key={index}
                  isCorrect={true}
                  motDuJour={motDuJour[index].mot}
                  correctAnswer={motDuJour[index].correct}
                />
              ) : (
                <EvaluationResults
                  key={index}
                  isCorrect={false}
                  motDuJour={motDuJour[index].mot}
                  correctAnswer={motDuJour[index].correct}
                />
              ),
            )}

            <div className="w-full flex flex-col justify-center items-center animate-contentFadeIn"></div>
          </div>
        </div>
      )}
    </>
  );
}
