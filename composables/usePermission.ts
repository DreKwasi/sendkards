import { type Auth } from "firebase/auth";
import { type CreateUserCredentials, type UserLoginCredentials } from "../types/firebaseAuthTypes";
import { ref as Ref, uploadBytes, getDownloadURL, type FirebaseStorage } from "firebase/storage";
import { logEvent, type Analytics } from "firebase/analytics";
import { type User } from "firebase/auth";
import { doc, setDoc, type Firestore } from "firebase/firestore";
import { httpsCallable, type Functions } from "firebase/functions";
import { toast } from "vue-sonner";

export const usePermission = () => {
  const { $auth, $analytics, $db, $functions } = useNuxtApp();
  const auth = $auth as Auth;
  const functions = $functions as Functions;
  const analytics = $analytics as Analytics;
  const db = $db as Firestore;

  const feedbackStore = useFeedbackStore();
  const { loading } = storeToRefs(feedbackStore);

  const userStore = useUserStore();
  const { userAuth, userRoles, isSuperAdmin } = storeToRefs(userStore);

  let response = { status: "", msg: "" };

  //   Get user claims
  const getUserClaims = async (): Promise<{
    isSuperAdmin: Boolean;
  }> => {
    try {
      if (!isSuperAdmin.value) {
        const idTokenResult = await auth.currentUser!.getIdTokenResult();
        isSuperAdmin.value = (idTokenResult.claims.isSuperAdmin as Boolean) || false;
      }
      return { isSuperAdmin: isSuperAdmin.value };
    } catch (error) {
      toast.error("Failed to fetch user roles");
      return { isSuperAdmin: false };
    }
  };

  return { getUserClaims };
};
