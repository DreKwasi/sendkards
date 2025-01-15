<script setup lang="ts">
  import { ChevronUp, User2 } from "lucide-vue-next";

  const { userLogout } = useFirebaseAuth();
  const userStore = useUserStore();
  const { userProfile, userAuth } = storeToRefs(userStore);
  const { subscribeToUserProfile } = useUserDb();
  subscribeToUserProfile();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton variant="outline">
        <div class="w-6 h-6 rounded-full">
          <img
            :src="userAuth?.photoURL!"
            alt="user-profile-photo"
            class="w-6 h-6 rounded-full"
            v-if="userAuth?.photoURL" />
          <User2 v-else />
        </div>
        <span>{{ userProfile?.first_name ? userProfile.first_name : userAuth!.email }}</span>
        <ChevronUp class="ml-auto" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="top" class="w-[--radix-popper-anchor-width]">
      <DropdownMenuItem class="dropdownmenu">
        <span>Profile</span>
      </DropdownMenuItem>
      <DropdownMenuItem class="dropdownmenu">
        <span>Theme</span>
        <ThemeComponent :expand="true" />
      </DropdownMenuItem>
      <DropdownMenuItem @click="() => userLogout()" class="dropdownmenu">
        <span>Sign out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>
  .dropdownmenu {
    @apply hover:cursor-pointer;
  }
</style>
