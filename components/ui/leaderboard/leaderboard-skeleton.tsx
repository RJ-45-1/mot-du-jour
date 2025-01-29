import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "../card";
import { Skeleton } from "../skeleton";

export default async function LeaderboardSkeleton() {
  return (
    <Card className="md:w-1/3 w-full">
      <CardContent className="pt-2">
        <div className="flex flex-col gap-4 w-full">
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
            {[1, 2, 3, 4, 5].map((_, index) => (
              <TableBody className="relative">
                <TableRow>
                  <TableCell>
                    <Skeleton className="w-[50px] h-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[100px] h-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[50px] h-[20px] absolute top-[8px] right-2" />
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
