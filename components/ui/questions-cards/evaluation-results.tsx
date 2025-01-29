import { CircleCheck, CircleX } from "lucide-react";

export default function EvaluationResults({
  motDuJour,
  correctAnswer,
  isCorrect,
}: {
  motDuJour: string;
  correctAnswer?: string;
  isCorrect: boolean;
}) {
  return isCorrect ? (
    <>
      <div className="flex flex-row items-center justify-center text-green-600">
        <CircleCheck className="mr-2" />
        <p>Bien vu !</p>
      </div>
      <p className="text-center">
        Tu as trouvé la bonne réponse pour le mot: {motDuJour}
      </p>
    </>
  ) : (
    <>
      <div className="flex flex-row items-center justify-center text-red-600">
        <CircleX className="mr-2" />
        <p>Et non du con...</p>
      </div>
      <p className=" text-center">
        Pour le mot: {motDuJour} Il fallait trouver: {correctAnswer}
      </p>
    </>
  );
}
