import { type Auth } from "firebase/auth";
import { type Analytics } from "firebase/analytics";
import { httpsCallable, type Functions } from "firebase/functions";
import { toast } from "vue-sonner";

export const useAPI = () => {
  const { $auth, $functions } = useNuxtApp();
  const auth = $auth as Auth;
  const functions = $functions as Functions;

  const completeUserProfile = async ({
    first_name,
    last_name,
    phone_number,
  }: {
    first_name: string;
    last_name: string;
    phone_number: string;
  }) => {
    const completeSignUp = httpsCallable(functions, "completeSignUp");
    await completeSignUp({
      email: auth.currentUser?.email,
      first_name,
      last_name,
      phone_number,
    });
  };

  return { completeUserProfile };
};
