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
  import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
  import { toTypedSchema } from "@vee-validate/zod";
  import { useForm } from "vee-validate";
  import { z } from "zod";

  const emit = defineEmits(["emailSubmitted"]);
  const openModal = ref(false);
  const inviteSchema = toTypedSchema(
    z.object({
      email: z.string().email(),
    })
  );
  const { handleSubmit } = useForm({
    validationSchema: inviteSchema,
  });

  const onSubmit = handleSubmit((values) => {
    emit("emailSubmitted", values.email);
    openModal.value = false;
  });
</script>

<template>
  <Dialog v-model:open="openModal">
    <DialogTrigger as-child>
      <Button variant="outline">Invite</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Invite member to team</DialogTitle>
        <DialogDescription> Enter the user's email to send an invitation </DialogDescription>
      </DialogHeader>
      <form @submit="onSubmit" class="grid gap-4 py-4 overflow-y-auto px-2">
        <FormField name="email" v-slot="{ componentField }">
          <FormItem v-auto-animate>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="johnwick@gmail.com" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <DialogFooter>
          <Button type="submit"> Send invite </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
