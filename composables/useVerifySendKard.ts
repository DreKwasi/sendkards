import { type Functions, httpsCallable } from "firebase/functions";

export const useVerifySendKard = () => {
  const { $functions } = useNuxtApp();
  const functions = $functions as Functions;

  const verifySendKard = async (voucherId: string) => {
    try {
      const verifySendKard = httpsCallable(functions, "verifySendKard");
      const response = await verifySendKard({
        voucherId: voucherId,
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  return {
    verifySendKard,
  };
};
