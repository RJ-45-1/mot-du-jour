import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { shuffleArray } from "@/lib/utils";
import { MotDuJour } from "@/types";
import { Loader2, NotebookPen } from "lucide-react";

type QuestionCardProps = {
  isSubmitting: boolean;
  selectedProposition: null | string;
  motDuJour: MotDuJour;
  handlePropositionSelected: (propostion: string) => void;
  handleSubmit: () => void;
};

export default function DailyQuestionCard({
  isSubmitting,
  motDuJour,
  selectedProposition,
  handlePropositionSelected,
  handleSubmit,
}: QuestionCardProps) {
  let suffledPropositions = shuffleArray(motDuJour.propositions);
  return (
    <Card className="w-full md:w-2/3">
      <CardHeader>
        <CardTitle className="flex flex-row justify-center items-center text-sm md:text-lg">
          <NotebookPen className="mr-2 text-primary" /> Le mot du jour:
          <p className="text-sm md:text-lg ml-2 underline">{motDuJour.mot}</p>
        </CardTitle>
        <CardTitle className="flex flex-row justify-center items-center">
          <p className="text-sm md:text-base">Qui signifie ...</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {suffledPropositions.map((proposition, key) => (
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
          disabled={typeof selectedProposition !== "string"}
          onClick={() => handleSubmit()}
        >
          {isSubmitting && <Loader2 className="animate-spin ml-2" />}
          <p className="text-sm md:text-base">Valider</p>
        </Button>
      </CardFooter>
    </Card>
  );
}
