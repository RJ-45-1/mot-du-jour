import SignIn from "@/components/ui/auth/signin";
import { NotebookPen } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col min-h-dvh w-full items-center justify-center py-4 bg-muted">
      <div className="mb-4 flex flex-row items-center gap-2 font-medium">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <NotebookPen className="size-4" />
        </div>
        Le jeu de mot
      </div>
      <SignIn />
    </div>
  );
}
