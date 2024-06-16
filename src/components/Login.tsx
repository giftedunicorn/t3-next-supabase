"use client";

import { useAuth } from "@/hooks/useAuth";
// import { supabase } from "@/utils/supabase/server";

export const LogIn = () => {
  const {
    isSignedIn,
    loginWithEmailPassword,
    loginWithGoogle,
    loginWithApple,
    loginWithMagicLink,
  } = useAuth();
  console.log(isSignedIn);

  const onLoginWithEmailPassword = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    void loginWithEmailPassword(email, password);
  };

  const onLoginWithMagicLink = (formData: FormData) => {
    const email = formData.get("email") as string;
    void loginWithMagicLink(email);
  };

  return (
    <div className="flex flex-col gap-10">
      <form action={onLoginWithEmailPassword}>
        <div className="m-2">
          email
          <input
            type="email"
            name="email"
            className="ml-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="m-2">
          password
          <input
            type="password"
            name="password"
            className="ml-2 rounded-md border border-gray-300"
          />
        </div>
        <button
          type="submit"
          className="m-2 w-48 rounded-md border border-gray-300 p-2"
        >
          Submit
        </button>
      </form>

      <form action={onLoginWithMagicLink}>
        <div className="m-2">
          email
          <input
            type="email"
            name="email"
            className="ml-2 rounded-md border border-gray-300"
          />
        </div>
        <button
          type="submit"
          className="m-2 w-48 rounded-md border border-gray-300 p-2"
        >
          Magic Link
        </button>
      </form>

      <button
        className="m-2 block w-48 rounded-md border border-gray-300 p-2"
        onClick={() => {
          void loginWithGoogle();
        }}
      >
        Google Sign In
      </button>

      <button
        className="m-2 block w-48 rounded-md border border-gray-300 p-2"
        onClick={() => {
          void loginWithApple();
        }}
      >
        Apple Sign In
      </button>
    </div>
  );
};
