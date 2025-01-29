import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Create response early
  let response = NextResponse.next({
    request: request.clone(),
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          response.cookies.set(name, value, options);
        },
        remove(name: string, options: any) {
          response.cookies.set(name, "", options);
        },
      },
    },
  );

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If no user and not on auth pages, redirect to signin
    if (
      !user &&
      !request.nextUrl.pathname.startsWith("/signin") &&
      !request.nextUrl.pathname.startsWith("/signup")
    ) {
      const url = new URL("/signin", request.url);
      return NextResponse.redirect(url);
    }

    // If user exists, check additional conditions
    if (user) {
      const { data: userInfos, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error || !userInfos) {
        console.error("Error fetching user info:", error);
        return response;
      }

      // Check mot_du_jour condition
      if (!userInfos.done_mot_du_jour && request.nextUrl.pathname !== "/") {
        const url = new URL("/", request.url);
        return NextResponse.redirect(url);
      }

      // Check leaderboard condition
      if (
        userInfos.done_mot_du_jour &&
        !request.nextUrl.pathname.startsWith("/leaderboard")
      ) {
        const url = new URL("/leaderboard", request.url);
        return NextResponse.redirect(url);
      }
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return response;
  }
}
