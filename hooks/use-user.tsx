import { createClient } from "@/lib/supabase/client";
import { UserInfos } from "@/types";
import { useEffect, useState } from "react";

export function useUser() {
  const supabase = createClient();
  const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await supabase.auth.getUser();
        const { data: userInfos, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.data.user?.id)
          .single();

        if (error) throw error;
        if (userInfos) {
          setUserInfos(userInfos as UserInfos);
        }
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  return { userInfos, isLoading, error };
}
