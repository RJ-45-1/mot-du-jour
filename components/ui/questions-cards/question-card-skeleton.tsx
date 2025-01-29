import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { NotebookPen } from "lucide-react";

export default function QuestionCardSkeleton() {
  return (
    <Card className="w-full md:w-2/3">
      <CardHeader>
        <CardTitle className="flex flex-row justify-center items-center">
          <NotebookPen className="mr-2" /> Le mot du jour:
          <Skeleton className="w-[100px] h-[20px] ml-2 underline" />
        </CardTitle>
        <CardTitle className="flex flex-row justify-center items-center">
          <p>Qui signifie ...</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center items-center gap-4 mt-4">
          {[1, 2, 3, 4].map((_, index) => (
            <Button
              className="animate-fade-in w-2/3 mr-2"
              key={index}
              variant={"outline"}
            >
              <Skeleton className="w-5/6 h-[20px]" />
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-center">
        <Button>
          <p className="text-sm md:text-base">Valider</p>
        </Button>
      </CardFooter>
    </Card>
  );
}
