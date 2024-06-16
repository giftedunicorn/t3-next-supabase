"use client";

import { useAuth } from "@/hooks/useAuth";

export const AppHeader = () => {
  const { logOut, isSignedIn } = useAuth();
  console.log("isSignedIn", isSignedIn);

  return (
    <div className="flex flex-row justify-around">
      <button
        onClick={() => {
          void logOut();
        }}
        className="m-2 rounded-md border border-red-300 p-2"
      >
        Log out
      </button>
    </div>
  );
};
