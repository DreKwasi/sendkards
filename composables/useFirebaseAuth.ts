import {
  setPersistence,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type Auth,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { type CreateUserCredentials, type UserLoginCredentials } from "../types/firebaseAuthTypes";
import { ref as Ref, uploadBytes, getDownloadURL, type FirebaseStorage } from "firebase/storage";
import { logEvent, type Analytics } from "firebase/analytics";
import { type User } from "firebase/auth";
import { doc, setDoc, type Firestore } from "firebase/firestore";

export const useFirebaseAuth = () => {
  const { $auth, $analytics, $storage, $db } = useNuxtApp();
  const storage = $storage as FirebaseStorage;
  const auth = $auth as Auth;
  const analytics = $analytics as Analytics;
  const db = $db as Firestore;
  const router = useRouter();

  const feedbackStore = useFeedbackStore();
  const { loading } = storeToRefs(feedbackStore);

  const userStore = useUserStore();
  const { userAuth, userRoles, isSuperAdmin } = storeToRefs(userStore);

  const errMsg = useState("errMsg", () => "");

  let response = { status: "", message: "" };
  const logInErrCase = (code: string) => {
    const errorMessages: Record<string, string> = {
      "auth/invalid-email": "Your email or password may be incorrect",
      "auth/user-not-found": "User not found. Try signing up",
      "auth/invalid-credential": "Your email or password may be incorrect",
      "auth/wrong-password": "Your email or password may be incorrect",
      "auth/network-request-failed": "No internet connection",
      "auth/popup-closed-by-user": "Authentication cancelled",
      "auth/email-already-in-use": "Email already exists. Try signing in",
      "auth/web-storage-unsupported": "Oops! Cookies blocked",
      "auth/invalid-continue-uri": "Invalid domain URL",
      "auth/invalid-action-code": "Email link revoked",
    };
    errMsg.value = errorMessages[code];
  };

  const userLogin = async (credentials: UserLoginCredentials) => {
    loading.value = true;
    const { email, password } = credentials;
    errMsg.value = "";
    let response: { status: string; message: string } = { status: "", message: "" };

    try {
      await setPersistence(auth, browserLocalPersistence);
      const credential = await signInWithEmailAndPassword(auth, email, password);
      logEvent(analytics, "login");

      userAuth.value = credential.user;
      response = { status: "success", message: "Login successful" };
      router.push({ name: "verify" });
    } catch (error: any) {
      console.log(error);
      logInErrCase(error.code);
      response = { status: "error", message: errMsg.value };
    } finally {
      loading.value = false;
      return response;
    }
  };

  const emailVerificationHandler = async () => {
    await sendEmailVerification(auth.currentUser!).catch((error) => {
      throw error;
    });
  };

  const getUser = () => {
    return new Promise((resolve, reject) => {
      if (userAuth.value) {
        return resolve(userAuth.value);
      }
      const removeListener = onAuthStateChanged(
        auth,
        (currentUser) => {
          userAuth.value = currentUser as User;
          removeListener();
          return resolve(userAuth.value);
        },
        reject
      );
    });
  };

  const getUserToken = async () => {
    const firebaseUserToken = await userAuth.value?.getIdToken();
    if (!firebaseUserToken) {
      throw new Error("Your login session is expired. Refresh and try again");
    }
    return firebaseUserToken;
  };

  const resetPassword = async (email: string) => {
    errMsg.value = "";
    let response: { status: string; message: string } = { status: "", message: "" };
    try {
      await sendPasswordResetEmail(auth, email);
      response = { status: "success", message: "Reset email link sent" };
    } catch (error: any) {
      logInErrCase(error.code);
      response = { status: "error", message: errMsg.value };
      throw error;
    } finally {
      return response;
    }
  };

  const userLogout = async () => {
    loading.value = true;
    try {
      await signOut(auth);
      userAuth.value = null;
      router.push({ name: "login" });
    } catch (error) {
      logEvent(analytics, `logout_failed`);
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  const isUserAuthorized = async (orgId: string) => {
    return isSuperAdmin || !!userRoles.value![orgId];
  };

  return {
    userLogin,
    getUser,
    userLogout,
    getUserToken,
    resetPassword,
    emailVerificationHandler,
    isUserAuthorized,
  };
};
