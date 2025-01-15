import { type Auth, updateProfile } from "firebase/auth";
import { Firestore, onSnapshot, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { logEvent, type Analytics } from "firebase/analytics";
import { httpsCallable, type Functions, type HttpsCallableResult } from "firebase/functions";
import type { UserDb } from "~/types/userTypes";

export const useUserDb = () => {
  const { $auth, $analytics, $db, $functions } = useNuxtApp();
  const auth = $auth as Auth;
  const analytics = $analytics as Analytics;
  const db = $db as Firestore;
  const functions = $functions as Functions;

  let response = { status: "", message: "" };
  const userStore = useUserStore();
  const { isProfileComplete, userProfile, userAuth } = storeToRefs(userStore);

  const subscribeToUserProfile = () => {
    const userDocRef = doc(db, "users", auth.currentUser!.uid);
    return onSnapshot(
      userDocRef,
      (doc) => {
        if (doc.exists()) {
          userProfile.value = { ...doc.data(), id: doc.id } as UserDb;
        } else {
          userProfile.value = null;
        }
      },
      (error) => {}
    );
  };

  const profileComplete = async (profileDetails: {
    first_name: string;
    last_name: string;
    phone_number: string;
    date: Date;
  }) => {
    try {
      const userProfileRef = doc(db, "users", auth.currentUser!.uid);
      const completeUserProfile = httpsCallable(functions, "completeUserProfile");
      updateProfile(auth.currentUser!, {
        displayName: `${profileDetails.first_name} ${profileDetails.last_name}`,
      });
      userAuth.value = auth.currentUser!;
      updateDoc(userProfileRef, {
        ...profileDetails,
        profile_completed: true,
        created_date: serverTimestamp(),
        updated_date: serverTimestamp(),
      });
      await completeUserProfile();
      logEvent(analytics, "profile_completed");
      isProfileComplete.value = true;
      const userSessionStorageString = JSON.stringify({
        isProfileComplete: isProfileComplete.value,
      });
      sessionStorage.setItem(`${auth.currentUser!.uid}_profile_complete`, userSessionStorageString);
      response = { status: "success", message: "Profile saved successfully" };
    } catch (error) {
      console.error(error);
      response = { status: "success", message: "Something went wrong. Please retry" };
    } finally {
      return response;
    }
  };
  return { profileComplete, subscribeToUserProfile };
};
