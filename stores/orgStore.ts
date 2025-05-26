import { defineStore } from "pinia";
import type { OrgType } from "~/types/org.types";

export const useOrgStore = defineStore("orgStore", () => {
  const orgList = ref<OrgType[]>([]);
  const org = ref<OrgType | null>(null);
  const reset = () => {
    orgList.value = [];
    org.value = null;
  };
  return { org, orgList, reset };
});
