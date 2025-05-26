import { type Functions, httpsCallable } from "firebase/functions";

export const useVerifySendKard = () => {
  const { $functions } = useNuxtApp();
  const functions = $functions as Functions;
  const { getOrg } = useOrg();
  const orgStore = useOrgStore();
  const { org } = storeToRefs(orgStore);

  const verifySendKard = async (voucherId: string, orgId: number) => {
    try {
      if(!org.value){
        await getOrg(orgId);
      }
      const verifySendKard = httpsCallable(functions, "verifySendKard");
      const response = await verifySendKard({
        voucherId: voucherId,
        organizationDetails: org.value,
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
