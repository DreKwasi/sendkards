import { type Auth, updateProfile } from "firebase/auth";
import { logEvent, type Analytics } from "firebase/analytics";
import type { VendorDb } from "~/types/vendor.types";
import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/database.types";

export const useUserDb = () => {
  const { $auth, $analytics, $supabase } = useNuxtApp();
  const auth = $auth as Auth;
  const analytics = $analytics as Analytics;
  const supabase = $supabase as SupabaseClient<Database, "api", Database["api"]>;
  let response = { status: "", message: "" };
  const userStore = useUserStore();
  const { isProfileComplete, userProfile, userAuth } = storeToRefs(userStore);

  const fetchUserProfile = async () => {
    const { data, error } = await supabase
      .from("vendors")
      .select("*")
      .eq("id", auth.currentUser!.uid)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      userProfile.value = null;
    } else if (data) {
      userProfile.value = { ...data, uid: data.uid } as VendorDb;
    } else {
      userProfile.value = null;
    }
  };

  const updateDBProfile = async (
    p0: unknown,
    p1: { displayName: string },
    profileDetails: {
      first_name: string;
      last_name: string;
      phone_number: string;
      date: Date;
    }
  ) => {
    try {
      updateProfile(auth.currentUser!, {
        displayName: `${profileDetails.first_name} ${profileDetails.last_name}`,
      });
      userAuth.value = auth.currentUser!;

      const { error } = await supabase
        .from("vendors")
        .update({
          ...profileDetails,
          updated_at: new Date().toISOString(),
        })
        .eq("uid", auth.currentUser!.uid);

      if (error) {
        console.error("Error updating profile:", error);
        response = { status: "error", message: "Something went wrong. Please retry" };
        return response;
      }

      isProfileComplete.value = true;
      const userSessionStorageString = JSON.stringify({
        isProfileComplete: isProfileComplete.value,
      });
      sessionStorage.setItem(`${auth.currentUser!.uid}_profile_complete`, userSessionStorageString);
      response = { status: "success", message: "Profile saved successfully" };
    } catch (error) {
      console.error(error);
      response = { status: "error", message: "Something went wrong. Please retry" };
    } finally {
      return response;
    }
  };

  return { updateDBProfile, fetchUserProfile };
};
