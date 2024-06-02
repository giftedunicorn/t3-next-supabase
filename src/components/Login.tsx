import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const LogIn = () => {
  const logIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createServerActionClient({
      cookies,
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  return (
    <form action={logIn}>
      <div className="m-2">
        email
        <input
          type="email"
          name="email"
          className="ml-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="m-2">
        password
        <input
          type="password"
          name="password"
          className="ml-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="m-2 p-2 border border-gray-300 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};
