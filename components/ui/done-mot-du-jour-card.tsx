import { Smile } from "lucide-react";
import { Card, CardContent } from "./card";

export default function DoneMotDuJourCard() {
  return (
    <Card className="md:w-2/3 w-full">
      <CardContent className="flex w-full justify-center items-center h-[360px]">
        <Smile className="mr-2 text-primary" /> Tu as fait le mot du jour !
      </CardContent>
    </Card>
  );
}
