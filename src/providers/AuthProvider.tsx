"use client";

import { type ReactNode, createContext, useEffect, useState } from "react";
import { type Session, type User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const AuthContext = createContext<{
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isSignedIn: boolean | undefined;
}>({
  user: null,
  session: null,
  isLoading: false,
  isSignedIn: undefined,
});

const setCookies = (session: Session | null) => {
  if (session) {
    const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires

    document.cookie = `access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
    document.cookie = `refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
  } else {
    const expires = new Date(0).toUTCString();

    document.cookie = `access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
    document.cookie = `refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
  }
};

export const AuthProvider = ({
  user: initialUser,
  session: initialSession,
  children,
}: {
  user: User | null;
  session: Session | null;
  children: ReactNode;
}) => {
  const [userSession, setUserSession] = useState<Session | null>(
    initialSession,
  );
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(!initialUser);
  const [isSignedIn, setIsSignedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    supabase()
      .auth.getSession()
      .then(({ data: { session } }) => {
        setUserSession(session);
        setUser(session?.user ?? null);
        setCookies(session);
        setIsLoading(false);
        setIsSignedIn(session !== null);
      })
      .catch((error) => {
        console.error("supbase getSession error", error);
      });

    const { data: authListener } = supabase().auth.onAuthStateChange(
      (event, session) => {
        console.log("Supbase auth event:", event);
        console.log("Supbase auth session:", session);

        setUserSession(session);
        setUser(session?.user ?? null);
        setCookies(session);
        setIsLoading(false);
        setIsSignedIn(session !== null);

        if (event === "SIGNED_IN" || session) {
          console.log("User is signed in");
        } else if (event === "SIGNED_OUT") {
          console.log("User is signed out");
        } else if (event === "USER_UPDATED") {
          console.log("User is updated");
        } else if (event === "PASSWORD_RECOVERY") {
          console.log("Password recovery");
        } else if (event === "INITIAL_SESSION") {
          console.log("Initial session");
        } else if (event === "TOKEN_REFRESHED") {
          console.log("Token refreshed");
        } else if (event === "MFA_CHALLENGE_VERIFIED") {
          console.log("MFA challenge verified");
        } else {
          console.log("Unknown event");
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session: userSession,
    user,
    isLoading,
    isSignedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <ReactQueryDevtools />
    </AuthContext.Provider>
  );
};
