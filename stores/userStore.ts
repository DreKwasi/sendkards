import { defineStore } from "pinia";
import { type Auth, type User } from "firebase/auth";
import type { UserDb } from "~/types/userTypes";

export const useUserStore = defineStore("userStore", () => {
  const { $auth } = useNuxtApp();
  const auth = $auth as Auth;
  const currentUser = auth.currentUser;
  const userAuth = ref<User | null>(currentUser as User);
  const isEmailVerified = ref<Boolean>(false);
  const userRoles = ref<Record<string, string> | null>(null);
  const isSuperAdmin = ref<Boolean>(false);
  const userProfile = ref<UserDb | null>(null);
  const isProfileComplete = ref<Boolean>(false);
  return { userAuth, isEmailVerified, userRoles, isSuperAdmin, userProfile, isProfileComplete };
});
