import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import { type Session, type User } from "@supabase/supabase-js";

export function supabase() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}

export const getServerUser = cache(async () => {
  let user: User | null = null;
  let session: Session | null = null;

  try {
    const { error, data } = await supabase().auth.getSession();
    console.log(data);

    if (error) {
      console.error("supbase getSession error", error);
      return {
        user: null,
        session: null,
      };
    }

    user = data?.session?.user ?? null;
    session = data?.session ?? null;
  } catch (error) {
    console.error("supbase getSession error", error);
  }

  return { user, session };
});
