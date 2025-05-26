<script setup lang="ts">
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";

  import { Button } from "@/components/ui/button";
  import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { toast } from "vue-sonner";
  import { LoaderCircle } from "lucide-vue-next";

  const feedbackStore = useFeedbackStore();
  const { loading } = storeToRefs(feedbackStore);

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(10).max(50),
      location: z.string().min(10).max(50),
    })
  );

  const form = useForm({
    validationSchema: formSchema,
  });
  const { createOrg } = useOrg();

  const onSubmit = form.handleSubmit(async (values) => {
    const response = await createOrg(values);
    if (response.status === "success") {
      toast.success(response.msg);
      return;
    }
    toast.error(response.msg);
  });
</script>

<template>
  <form @submit="onSubmit" class="space-y-3">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name of organization</FormLabel>
        <FormControl>
          <Input type="text" placeholder="37 Military Hospital" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="location">
      <FormItem>
        <FormLabel>Location</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Accra" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="w-full" :disabled="loading">
      <span v-if="!loading">Submit</span>
      <span v-else>Loading</span>
      <LoaderCircle class="w-5 h-5 animate-spin" v-if="loading" />
    </Button>
  </form>
</template>
