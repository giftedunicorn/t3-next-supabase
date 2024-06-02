"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const LogOut = () => {
  const supabase = createClientComponentClient();

  const logOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <button
      className="m-2 p-2 border border-gray-300 rounded-md"
      onClick={logOut}
    >
      LogOut
    </button>
  );
};
