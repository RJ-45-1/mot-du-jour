import { ArrowRight, CircleCheck, CircleX, Flame } from "lucide-react";

type ResponseProps = {
  streaks: number;
  isCorrect: boolean;
  correctAnswer: string;
  setValidated: (newState: boolean) => void;
};

export default function Response({
  streaks,
  isCorrect,
  correctAnswer,
  setValidated,
}: ResponseProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 animate-fadeIn"
      onClick={() => setValidated(false)}
    >
      <div
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg animate-modalSlideIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity">
          <button className="p-2" onClick={() => (window.location.href = "/")}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="w-full flex flex-col justify-center items-center animate-contentFadeIn">
          {isCorrect ? (
            <>
              <div className="flex flex-row items-center justify-center text-green-600">
                <CircleCheck className="mr-2" />
                <p>Bien vu !</p>
              </div>
              <p className="mt-2">Tu as trouvé la bonne réponse</p>
              <div className="mt-4 flex flex-row justify-center items-center w-full">
                <Flame className="text-orange-400" />
                <p>{streaks + 1}</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row items-center justify-center text-red-600">
                <CircleX className="mr-2" />
                <p>Et non du con...</p>
              </div>
              <p className="mt-2">Il fallait trouver: {correctAnswer}</p>
              <div className="mt-4 flex flex-row justify-center items-center w-full">
                <Flame className="text-orange-400" />
                <p>0</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
