import { defineNuxtPlugin } from "#app";
import { type Auth } from "firebase/auth";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../database.types";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const auth = nuxtApp.$auth as Auth;

  let supabaseClient: SupabaseClient<any, "api", any> | null = null;
  try {
    supabaseClient = createClient<Database>(config.public.supabaseUrl, config.public.supabaseApi, {
      accessToken: async () => {
        return (await auth.currentUser?.getIdToken(true)) ?? null;
      },
      db: {
        schema: "api",
      },
    });
  } catch (e) {
    console.error("Failed to load supabase", e);
  }
  nuxtApp.provide("supabase", supabaseClient);
});
