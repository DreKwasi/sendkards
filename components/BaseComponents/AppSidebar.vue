<script setup lang="ts">
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
  } from "@/components/ui/sidebar";
  import { Layers, Goal, ChartSpline } from "lucide-vue-next";
  const route = useRoute();

  // Menu items.
  const items = [
    {
      title: "Dashboard",
      icon: Layers,
      url: "/dashboard",
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Goal,
    },
  ];
</script>

<template>
  <Sidebar class="px-2" collapsible="icon" side="left">
    <SidebarContent>
      <SidebarGroup />
      <SidebarGroupLabel><span class="text-base">SendKards</span></SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in items" :key="item.title" :id="item.title">
            <SidebarMenuButton as-child :is-active="route.path === item.url">
              <NuxtLink :to="item.url">
                <component :is="item.icon" />
                <span class="text-base">{{ item.title }}</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
      <SidebarGroup />
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <ProfileFooter />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
