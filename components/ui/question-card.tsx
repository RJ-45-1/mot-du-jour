import { MotDuJour } from "@/types";
import { NotebookPen } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";

type QuestionCardProps = {
  selectedProposition: null | string;
  motDuJour: MotDuJour;
  handlePropositionSelected: (propostion: string) => void;
  handleSubmit: () => void;
};

export default function QuestionCard({
  motDuJour,
  selectedProposition,
  handlePropositionSelected,
  handleSubmit,
}: QuestionCardProps) {
  return (
    <Card className="w-full md:w-2/3">
      <CardHeader>
        <CardTitle className="flex flex-row justify-center items-center">
          <NotebookPen className="mr-2" /> Le mot du jour:
          <p className="text-lg ml-2 underline">{motDuJour.mot}</p>
        </CardTitle>
        <CardTitle className="flex flex-row justify-center items-center">
          <p>Qui signifie ..</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {motDuJour.propositions.map((proposition, key) => (
            <Button
              className={`${proposition === selectedProposition ? "bg-primary/10 hover:bg-primary/10 text-accent-foreground" : ""} md:w-2/3 w-full`}
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
          <p className="text-sm md:text-base">Valider</p>
        </Button>
      </CardFooter>
    </Card>
  );
}
