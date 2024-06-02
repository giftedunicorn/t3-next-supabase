"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

export const AppHeader = () => {
  useEffect(() => {
    const supabase = createClientComponentClient();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Supbase auth event:", event);
        console.log("Supbase auth session:", session);
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
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   const supabase = createClientComponentClient();
  //   supabase.auth.signInAnonymously().then((res) => {
  //     console.log("signInAnonymously", res);
  //   });
  // }, []);

  const loginWithGoogle = () => {
    const supabase = createClientComponentClient();
    const origin = location.origin;

    supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          skipBrowserRedirect: true,
          redirectTo: `${origin}/auth/callback`,
          queryParams: { prompt: "select_account" },
        },
      })
      .then((res) => {
        openPopup(res.data.url!);
        console.log("signInWithOAuth google", res);
      });
  };

  const openPopup = (url: string) => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // window features for popup
    const windowFeatures = `scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`;
    const popup = window.open(url, "popup", windowFeatures);
    return popup;
  };

  const logOut = async () => {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut();
  };

  return (
    <div className="flex flex-row justify-around">
      <button
        className="m-2 rounded-md border border-gray-300 p-2"
        onClick={() => {
          loginWithGoogle();
        }}
      >
        Google Sign In
      </button>

      <button
        onClick={() => {
          logOut();
        }}
        className="m-2 rounded-md border border-red-300 p-2"
      >
        Log out
      </button>
    </div>
  );
};
