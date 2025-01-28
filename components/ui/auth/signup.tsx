"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SupabaseError {
  message: string;
}

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: "❌ Une erreur est survenue",
          description: error.message || "Une erreur inattendue s'est produite",
          variant: "destructive",
        });
        return;
      } else if (data) {
        const uuid = data.user?.id;
        const { error } = await supabase.from("users").insert([
          {
            id: uuid,
            streaks: 0,
            done_mot_du_jour: false,
          },
        ]);
        if (error) {
          toast({
            title: "❌ Une erreur est survenue",
            description:
              error.message || "Une erreur inattendue s'est produite",
            variant: "destructive",
          });
          return;
        } else {
          router.push("/");
          toast({
            title: "🎉 Bravo",
            description: "Vous êtes maintenant connecté",
            variant: "default",
          });
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "❌ Une erreur est survenue",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="min-w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardTitle>Bienvenue au jeu de mot</CardTitle>
          <CardDescription>
            Apprendre des mots pour être moins con
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={`${showPassword ? "text" : "password"}`}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    className="relative"
                  />
                  {showPassword === true ? (
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20"
                      onClick={() => setShowPassword(false)}
                    >
                      <Eye className="text-secondary-foreground/70" />
                    </button>
                  ) : (
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20"
                      onClick={() => setShowPassword(true)}
                    >
                      <EyeOff className="text-secondary-foreground/70" />
                    </button>
                  )}
                </div>
              </div>
              <Button
                disabled={email.length === 0 || password.length === 0}
                type="button" // Changed from "submit" to "button"
                className="w-full"
                onClick={handleSignUp}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSignUp();
                  }
                }}
              >
                S'inscrire{" "}
                {loading && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row w-full justify-center items-center">
          <Link href={"/signin"} className="text-sm hover:underline">
            Sign in
          </Link>
        </CardFooter>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground"></div>
    </div>
  );
}
