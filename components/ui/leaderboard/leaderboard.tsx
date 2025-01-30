import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaderboardType } from "@/types";
import { Card, CardContent } from "../card";

export default async function Leaderboard({
  data,
}: {
  data: LeaderboardType[] | undefined;
}) {
  return (
    <Card className="md:w-1/3 w-full">
      <CardContent className="pt-2">
        <div className="flex flex-col gap-4 w-full h-[350px] overflow-y-scroll scrollbar-hidden">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Leaderboard</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Top players of the game
            </p>
          </div>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead>Username</TableHead>
                <TableHead className="text-right">Streaks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data.map((player, rank) => (
                  <TableRow key={rank}>
                    <TableCell className="font-medium items-center">
                      {" "}
                      {rank + 1}
                      {rank === 0 && "🥇"}
                      {rank === 1 && "🥈"}
                      {rank === 2 && "🥉"}
                    </TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell className="text-right">
                      {player.streaks}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
