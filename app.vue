<script setup lang="ts">
  import { Toaster } from "@/components/ui/sonner";
</script>

<template>
  <div class="font-geist">
    <NuxtLayout>
      <Toaster class="pointer-events-auto" :rich-colors="true" :close-button="true" />
      <Spinner />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.4s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
</style>

