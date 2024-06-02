import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const SignUp = () => {
  const signUp = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createServerActionClient({
      cookies,
    });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: `http://localhost:3000/auth/callback`,
      },
    });
  };

  return (
    <form action={signUp}>
      <div className="m-2">
        name
        <input
          type="text"
          name="name"
          className="ml-2 border border-gray-300 rounded-md"
        />
      </div>
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
