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
  if (!user.emailVerified) {
    if (to.name !== "email-verification") {
      return navigateTo({
        path: "/email-verification",
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }
  if (!user.emailVerified) {
    if (to.name !== "email-verification") {
      return navigateTo({
        path: "/email-verification",
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }
  // Check for org_id param in the route and validate it against user claims
  if (to.params.org_id === "undefined") {
    return navigateTo({
      path: "/onboarding",
    });
  }
  if (to.params.org_id) {
    const { getUserClaims } = usePermission(); // Access the Firebase auth instance
    const { roles, isSuperAdmin } = await getUserClaims();

    // If user roles do not include the org_id, redirect to "unauthorized" page
    if (!isSuperAdmin && (!roles || !roles[to.params.org_id as string])) {
      return navigateTo({
        path: "/onboarding",
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }
});
