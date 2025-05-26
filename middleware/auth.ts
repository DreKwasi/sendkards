import { type User } from "firebase/auth";

// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { getUser } = useFirebaseAuth();
  const user = (await getUser()) as User;

  // redirect the user to the login page
  if (!user) {
    return navigateTo({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  }
  if (!user.emailVerified && to.name !== "email-verification") {
    return navigateTo({
      path: "/email-verification",
      query: {
        redirect: to.fullPath,
      },
    });
  }

});
