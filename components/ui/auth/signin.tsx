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

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      router.push("/");

      toast({
        title: "🎉 Identification réussie",
        description: "Vous êtes maintenant connecté",
        variant: "default",
      });
    } catch (error) {
      const customError = error as SupabaseError;
      toast({
        title: "❌ Une erreur est survenue",
        description: customError.message as string,
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
          <CardTitle className="text-xl">Bienvenue au jeu de mot</CardTitle>
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
                onClick={handleSignIn}
              >
                s'inscrire{" "}
                {loading && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row w-full justify-center items-center">
          <Link href={"/signup"} className="text-sm hover:underline">
            S'inscire
          </Link>
        </CardFooter>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground"></div>
    </div>
  );
}
