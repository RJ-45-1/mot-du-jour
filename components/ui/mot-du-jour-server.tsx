import { getMotDuJour } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import MainModal from "./main-modal";

export async function MotDuJourServer() {
  const supabase = await createClient();
  const motDuJour = await getMotDuJour(supabase);

  if (!motDuJour) {
    return <div>No word of the day found</div>;
  }

  return <MainModal motDuJour={motDuJour} />;
}
