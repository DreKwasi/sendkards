import { type User } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { getUser } = useFirebaseAuth();
  const user = (await getUser()) as User;

  if (user) {
    if (!user.emailVerified) {
      return navigateTo({
        path: "/email-verification",
      });
    }
    return navigateTo({
      path: "/verify",
    });
  }
});
