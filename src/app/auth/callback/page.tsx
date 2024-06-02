"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const PopupCallback = () => {
  const [mounted, setMounted] = useState(false);
  const params = useSearchParams();

  const code = params.get("code");

  useEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   if (!code) return;
  //   window.close();
  // }, []);

  useEffect(() => {
    const supabase = createClientComponentClient();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Supbase auth event:", event);
        console.log("Supbase auth session:", session);
        if (event === "SIGNED_IN" || session) {
          window.close();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (!mounted) return null;

  // Close the popup if there is no code
  if (!code) {
    window.close();
  }

  return <div></div>;
};

export default PopupCallback;
