<script setup lang="ts">
  definePageMeta({
    title: "Forgot Password",
    layout: "default",
    name: "forgot-password",
    middleware: "no-auth",
  });
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { Input } from "@/components/ui/input";
  import { Separator } from "@/components/ui/separator";
  import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { toast } from "vue-sonner";
  const formSchema = toTypedSchema(
    z.object({
      email: z.string({ message: "Email is required" }).email("Enter a valid email"),
    })
  );
  const { handleSubmit } = useForm({
    validationSchema: formSchema,
  });
  const { resetPassword } = useFirebaseAuth();

  const onSubmit = handleSubmit(async (values) => {
    const response = await resetPassword(values.email);
    if (response.status === "success") {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  });
</script>
<template>
  <div class="grid place-items-center h-[90vh]">
    <Card class="w-[350px]">
      <CardHeader>
        <NuxtLink
          to="/"
          class="cursor-pointer flex-row flex space-x-2 items-end justify-center mb-4 tracking-wider">
          <NuxtImg src="/logo" width="100" />
          <span class="text-xs font-bold">PIVOTS</span>
        </NuxtLink>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>Enter your email to receive a link to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="grid place-items-start gap-y-4 w-full">
          <FormField v-slot="{ componentField }" name="email" class="w-full">
            <FormItem class="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input class="w-full" placeholder="johnwick@email.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button class="w-full" type="submit">Reset password</Button>
        </form>
        <Separator class="my-2" />

        <NuxtLink to="/login"
          ><Button variant="outline" class="w-full">Go back to sign in</Button></NuxtLink
        >
      </CardContent>
    </Card>
  </div>
</template>
