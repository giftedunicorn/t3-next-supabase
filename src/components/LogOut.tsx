"use client";

import { useAuth } from "@/hooks/useAuth";

export const LogOut = () => {
  const { logOut } = useAuth();

  return (
    <button
      className="m-2 rounded-md border border-gray-300 p-2"
      onClick={logOut}
    >
      LogOut
    </button>
  );
};
