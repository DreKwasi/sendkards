<script setup lang="ts">
  import { SidebarProvider } from "~/components/ui/sidebar";
</script>

<template>
  <div class="min-h-screen w-full max-w-screen-3xl md:mx-auto mt-10">
    <SidebarProvider>
      <AppSidebar />
      <main class="w-full h-full px-4">
        <slot />
      </main>
    </SidebarProvider>
  </div>
</template>
