import { supabase } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const Profile = async () => {
  const {
    data: { session },
  } = await supabase().auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  console.log(user);

  return <h2>User Profile</h2>;
};
