<script setup lang="ts">
  import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>Add an organization</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add a new organization</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <OrgFormComponent />
      </div>
      <!-- <DialogFooter>
        <Button type="submit"> Save changes </Button>
      </DialogFooter> -->
    </DialogContent>
  </Dialog>
</template>
