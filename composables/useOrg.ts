import { type Auth } from "firebase/auth";
import { logEvent, type Analytics } from "firebase/analytics";
import {
  addDoc,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
  type Firestore,
} from "firebase/firestore";
import { httpsCallable, type Functions } from "firebase/functions";
import { toast } from "vue-sonner";
import type { OrgType } from "~/types/orgTypes";

export const useOrg = () => {
  const { $auth, $analytics, $db, $functions } = useNuxtApp();
  const auth = $auth as Auth;
  const functions = $functions as Functions;
  const analytics = $analytics as Analytics;
  const db = $db as Firestore;

  const feedbackStore = useFeedbackStore();
  const { loading } = storeToRefs(feedbackStore);
  const userStore = useUserStore();
  const { userRoles, isSuperAdmin } = storeToRefs(userStore);
  const orgStore = useOrgStore();
  const { orgList, org } = storeToRefs(orgStore);
  let response = { status: "", msg: "" };
  const ORGCOLLECTIONREF = collection(db, "organizations");

  const { isUserAuthorized } = useFirebaseAuth();

  const inviteUser = async (inviteUserEmail: string, organizationId: string, role: string) => {
    try {
      const inviteUserCallable = httpsCallable(functions, "inviteUser");
      response = (
        await inviteUserCallable({
          adminId: auth.currentUser?.uid,
          email: inviteUserEmail,
          organizationId: organizationId,
          role: role,
        })
      ).data as { status: string; msg: string };
    } catch (error: unknown) {
      const err = error as Error;
      response = { status: "error", msg: err.message };
    } finally {
      return response;
    }
  };

  const getAllOrgs = async () => {
    let orgSnapshot;
    try {
      if (isSuperAdmin.value) {
        orgSnapshot = await getDocs(ORGCOLLECTIONREF);
      } else {
        if (!userRoles.value) {
          return null;
        }
        const approvedOrgs = Object.keys(userRoles.value as {});
        console.log(approvedOrgs);
        const q = query(ORGCOLLECTIONREF, where(documentId(), "in", approvedOrgs));
        orgSnapshot = await getDocs(q);
      }

      if (!orgSnapshot.empty) {
        orgList.value = orgSnapshot.docs.map((orgDoc) => {
          return { ...orgDoc.data(), id: orgDoc.id } as OrgType;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkUniqueOrgName = async (name: string) => {
    const q = query(
      ORGCOLLECTIONREF,
      where("search_field", "==", name.toLowerCase().replace(/\s/g, ""))
    );
    const snapshot = await getDocs(q);
    return snapshot.empty;
  };

  const createOrg = async (data: { name: string; location: string }) => {
    loading.value = true;
    response = { status: "", msg: "" };

    try {
      const unique = await checkUniqueOrgName(data.name);
      console.log(unique);

      if (!isSuperAdmin.value) {
        response = {
          status: "error",
          msg: "You do not have the permission to create an organization. Contact Admin",
        };
      } else if (!unique) {
        response = {
          status: "error",
          msg: "Organization has already been created",
        };
      } else {
        const docRef = await addDoc(ORGCOLLECTIONREF, {
          ...data,
          search_field: data.name.toLowerCase().replace(/\s/g, ""),
          created_date: serverTimestamp(),
          updated_date: serverTimestamp(),
        });
        response = {
          status: "success",
          msg: "Account created successfully",
        };
      }
    } catch (error: any) {
      response = {
        status: "error",
        msg: error.message,
      };
    } finally {
      loading.value = false;
      return response;
    }
  };

  const getOrg = async (orgId: string) => {
    if (!isUserAuthorized(orgId)) {
      toast.error("You do not have access to this organization");
      return;
    }

    loading.value = true;
    try {
      const orgDocRef = doc(ORGCOLLECTIONREF, orgId);
      const docSnap = await getDoc(orgDocRef);

      if (docSnap.exists()) {
        org.value = { ...docSnap.data(), id: docSnap.id } as OrgType;
      }
    } finally {
      loading.value = false;
    }
  };

  return { getAllOrgs, createOrg, getOrg, inviteUser };
};
