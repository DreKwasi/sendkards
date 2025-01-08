<script setup lang="ts">
  definePageMeta({
    title: "Verify Kard",
    layout: "default",
    name: "verify",
    middleware: "auth",
  });
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { toTypedSchema } from "@vee-validate/zod";
  import { useForm } from "vee-validate";
  import * as z from "zod";

  const formSchema = toTypedSchema(
    z.object({
      orderId: z.string().min(2).max(50),
    })
  );

  const { handleSubmit } = useForm({
    validationSchema: formSchema,
  });

  const onSubmit = handleSubmit((values) => {});
</script>
<template>
  <div class="grid place-items-center h-[90vh]">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Verify SendKard</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form class="w-full space-y-6" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="orderId">
            <FormItem>
              <FormLabel>Enter Gift Card ID</FormLabel>
              <FormControl>
                <Input type="text" placeholder="1239801672" v-bind="componentField" />
              </FormControl>
              <FormDescription> Once you hit submit, we will verify the gift card </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit"> Submit </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
