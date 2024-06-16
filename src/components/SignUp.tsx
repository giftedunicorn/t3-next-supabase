import { supabase } from "@/utils/supabase/server";

export const SignUp = () => {
  const signUp = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase().auth.signUp({
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
          className="ml-2 rounded-md border border-gray-300"
        />
      </div>
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
        className="m-2 rounded-md border border-gray-300 p-2"
      >
        Submit
      </button>
    </form>
  );
};
