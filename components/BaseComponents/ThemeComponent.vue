<script setup lang="ts">
  import { Button } from "@/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Sun, Moon, Laptop2Icon } from "lucide-vue-next";

  defineProps({
    expand: {
      type: Boolean,
      default: false,
    },
  });
  const colorMode = useColorMode();
</script>

<template>
  <div class="w-full justify-end flex">
    <DropdownMenu v-if="!expand">
      <DropdownMenuTrigger as-child>
        <Button variant="outline">
          <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem @click="colorMode.preference = 'light'"> Light </DropdownMenuItem>
        <DropdownMenuItem @click="colorMode.preference = 'dark'"> Dark </DropdownMenuItem>
        <DropdownMenuItem @click="colorMode.preference = 'system'"> System </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <div class="flex justify-evenly border rounded-lg w-fit" v-else>
      <Button variant="outline" class="border-0" size="sm" @click="colorMode.preference = 'light'">
        <Sun class="h-[1.2rem] w-[1.2rem] transition-all" />
      </Button>
      <Button variant="outline" class="border-0" size="sm" @click="colorMode.preference = 'dark'">
        <Moon class="h-[1.2rem] w-[1.2rem] transition-all" />
      </Button>
      <Button variant="outline" class="border-0" size="sm" @click="colorMode.preference = 'system'">
        <Laptop2Icon class="h-[1.2rem] w-[1.2rem] transition-all" />
      </Button>
    </div>
  </div>
</template>
