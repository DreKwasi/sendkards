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
  import { toast } from "vue-sonner";

  const { verifySendKard } = useVerifySendKard();
  const formSchema = toTypedSchema(
    z.object({
      voucherId: z.string().min(2).max(50),
    })
  );

  const { handleSubmit } = useForm({
    validationSchema: formSchema,
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = (await verifySendKard(values.voucherId)) as {
      status: string;
      message: string;
      data: {};
    } | null;
    if (response === null) toast.error("Verification failed");
    if (response!.status === "success") {
      toast.success(response!.message);
    } else if (response!.status === "verified") {
      toast.info(response!.message);
    }
  });
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
          <FormField v-slot="{ componentField }" name="voucherId">
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
