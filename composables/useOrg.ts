import { type Auth } from "firebase/auth";

import { httpsCallable, type Functions } from "firebase/functions";
import type { OrgType } from "~/types/org.types";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/database.types";

export const useOrg = () => {
  const { $auth, $functions, $supabase } = useNuxtApp();
  const auth = $auth as Auth;
  const supabaseClient = $supabase as SupabaseClient<Database, "api", Database["api"]>;
  const functions = $functions as Functions;

  const feedbackStore = useFeedbackStore();
  const { loading } = storeToRefs(feedbackStore);
  const orgStore = useOrgStore();
  const { orgList, org } = storeToRefs(orgStore);
  let response = { status: "", msg: "" };

  const inviteUser = async (inviteUserEmail: string, organizationId: number, role: string) => {
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
    try {
      const { data, error } = await supabaseClient.from("organizations").select("*");
      if (error) {
        throw new Error(error.message);
      }
      orgList.value = data.map((org) => {
        return { ...org, id: org.id } as OrgType;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createOrg = async (data: { name: string; location: string }) => {
    loading.value = true;
    response = { status: "", msg: "" };

    try {
      const { data: orgData, error } = await supabaseClient
        .from("organizations")
        .insert([{ ...data, created_by: auth.currentUser?.uid }])
        .select()
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }
      if (!orgData) {
        throw new Error("Organization creation failed");
      }

      org.value = { ...orgData, id: orgData.id } as OrgType;
      response = { status: "success", msg: "Organization created successfully" };
    } catch (error: any) {
      response = { status: "error", msg: error.message };
    } finally {
      loading.value = false;
      return response;
    }
  };

  const getOrg = async (orgId: number) => {
    try {
      const { data, error } = await supabaseClient
        .from("organizations")
        .select("*")
        .eq("id", orgId)
        .maybeSingle();
      console.log(data);
      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      if (data) {
        org.value = { ...data, id: data.id } as OrgType;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllOrgs, createOrg, getOrg, inviteUser };
};
