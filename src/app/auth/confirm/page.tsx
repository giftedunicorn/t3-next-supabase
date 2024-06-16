"use client";

import { supabase } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const PopupCallback = () => {
  const [mounted, setMounted] = useState(false);
  const params = useSearchParams();
  const token_hash = params.get("token_hash");
  const type = params.get("type") as "magiclink" | null;

  const verifyOtp = useCallback(async () => {
    if (!token_hash) return;
    if (!type) return;

    const { error } = await supabase().auth.verifyOtp({ token_hash, type });

    if (error) {
      console.error("verifyOtp", error);
    }
  }, [token_hash, type]);

  useEffect(() => {
    setMounted(true);
    if (!token_hash) return;

    void verifyOtp();
  }, [token_hash, verifyOtp]);

  useEffect(() => {
    const { data: authListener } = supabase().auth.onAuthStateChange(
      (event, session) => {
        console.log("Supbase auth event:", event);
        console.log("Supbase auth session:", session);
        if (event === "SIGNED_IN" || session) {
          window.close();
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (!mounted) return null;

  // Close the popup if there is no code
  if (!token_hash) {
    window.close();
  }

  return <div></div>;
};

export default PopupCallback;
