<script setup lang="ts">
  definePageMeta({
    title: "Account Overview",
    layout: "default",
    name: "account",
    middleware: "auth",
  });
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { CircleUser } from "lucide-vue-next";
  import { toast } from "vue-sonner";
  import type { OrgType } from "~/types/org.types";

  const { getUserClaims } = usePermission();
  const { getAllOrgs } = useOrg();
  const userStore = useUserStore();
  const { userRoles, isSuperAdmin } = storeToRefs(userStore);
  const orgStore = useOrgStore();
  const { orgList, org } = storeToRefs(orgStore);
  const feedbackStore = useFeedbackStore();
  const { loading } = storeToRefs(feedbackStore);
  const { userLogout } = useFirebaseAuth();

  const selectOrg = (selOrg: OrgType) => {
    org.value = selOrg;
    navigateTo(`/org/${selOrg.id}/verify`);
  };
  const { inviteUser } = useOrg();

  const inviteHandler = async (email: string, orgId: number) => {
    loading.value = true;
    const response = await inviteUser(email, orgId, "admin");
    if (response.status === "success") {
      toast.success(response.msg);
    } else {
      toast.error(response.msg);
    }
    loading.value = false;
  };

  onMounted(async () => {
    loading.value = true;
    await getUserClaims();
    await getAllOrgs();
    loading.value = false;
  });
</script>

<template>
  <div class="flex-col flex min-h-screen w-full">
    <header
      class="sticky top-0 flex h-16 items-center justify-center w-full gap-4 border-b bg-background px-4 md:px-6">
      <nav
        class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full">
        <a href="#" class="text-foreground transition-colors hover:text-foreground"> Overview </a>
        <a href="#" class="text-muted-foreground transition-colors hover:text-foreground w-full">
          Settings (coming soon)
        </a>
      </nav>
      <div class="flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ThemeComponent :expand="true" />
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="() => userLogout()">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
    <main class="flex flex-1 flex-col p-4 md:p-8">
      <div class="flex flex-row justify-between w-full max-w-screen-md">
        <div class="mb-8">
          <h3 class="text-3xl font-semibold">Accounts</h3>
          <span class="text-muted-foreground">
            The organizations that are associated with your Sendkards account.
          </span>
        </div>
        <div v-if="isSuperAdmin">
          <OrgCreateOrgDialog />
        </div>
      </div>
      <div class="max-w-screen-md">
        <div
          class="w-full border h-24 rounded-lg p-4 flex flex-col justify-center"
          v-if="orgList.length > 0">
          <div
            class="flex w-full items-center justify-start space-x-3"
            v-for="orgVal of orgList"
            :key="orgVal.id"
            :id="orgVal.id.toString()">
            <Avatar>
              <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div class="flex flex-col w-full">
              <span class="font-bold">{{ orgVal.name }}</span>
              <div>
                <Badge size="sm">{{
                  isSuperAdmin ? "ADMIN" : userRoles![orgVal.id].toUpperCase()
                }}</Badge>
              </div>
            </div>
            <div class="flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <OrgInviteTeamMember
                @emailSubmitted="
                  (email: string) => {
                    inviteHandler(email, orgVal.id);
                  }
                " />
              <Button @click="selectOrg(orgVal)"> View </Button>
            </div>
          </div>
        </div>
        <Alert v-else-if="!loading && orgList.length === 0">
          <AlertTitle>You do not have access to any organization</AlertTitle>
          <AlertDescription> Contact your admin to send you an invite </AlertDescription>
        </Alert>
      </div>
    </main>
  </div>
</template>
