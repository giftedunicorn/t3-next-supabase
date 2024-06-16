import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { supabase } from "@/utils/supabase/client";

export function useAuth() {
  const context = useContext(AuthContext);
  const isSignedIn = context?.isSignedIn;
  const isLoading = context?.isLoading;
  const user = context?.user;

  const useSession = () => {
    if (context === undefined) {
      throw new Error("useUser must be used within a AuthContextProvider.");
    }

    return context;
  };

  const logOut = async () => {
    await supabase().auth.signOut();
  };

  const loginWithGoogle = async () => {
    const origin = location.origin;

    const { error, data } = await supabase().auth.signInWithOAuth({
      provider: "google",
      options: {
        skipBrowserRedirect: true,
        redirectTo: `${origin}/auth/callback`,
        queryParams: { prompt: "select_account" },
      },
    });

    if (error) {
      console.error("signInWithOAuth google", error);
      return;
    }

    if (!data?.url) return;

    openPopup(data.url);
  };

  const loginWithApple = async () => {
    const origin = location.origin;

    const { error, data } = await supabase().auth.signInWithOAuth({
      provider: "apple",
      options: {
        skipBrowserRedirect: true,
        redirectTo: `${origin}/auth/callback`,
        queryParams: { prompt: "select_account" },
      },
    });

    if (error) {
      console.error("signInWithOAuth apple", error);
      return;
    }

    if (!data?.url) return;

    openPopup(data.url);
  };

  const loginWithMagicLink = async (email: string) => {
    const origin = location.origin;

    const { data, error } = await supabase().auth.signInWithOtp({
      email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
        emailRedirectTo: `${origin}/auth/confirm`,
      },
    });

    if (error) {
      console.error("signInWithOtp", error);
      return;
    }

    return data;
  };

  const loginWithEmailPassword = async (email: string, password: string) => {
    const { data, error } = await supabase().auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("signInWithPassword", error);
      return;
    }

    return data;
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

  return {
    useSession,
    user,
    isLoading,
    isSignedIn,
    logOut,
    loginWithGoogle,
    loginWithApple,
    loginWithEmailPassword,
    loginWithMagicLink,
  };
}
