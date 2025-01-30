"use client";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const supabase = createClient();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/signin";
  };
  return (
    <button className="absolute top-4 right-4" onClick={() => handleSignOut()}>
      <LogOut />
    </button>
  );
}
