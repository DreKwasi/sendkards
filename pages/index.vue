<script setup lang="ts">
  definePageMeta({
    title: "Login",
    layout: "default",
    name: "login",
    middleware: "no-auth",
  });
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { Input } from "@/components/ui/input";
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
  import { toast } from "vue-sonner";
  const formSchema = toTypedSchema(
    z.object({
      email: z.string({ message: "Email is required" }).email("Enter a valid email"),
      password: z.string({ message: "Password is required" }),
    })
  );
  const { handleSubmit } = useForm({
    validationSchema: formSchema,
  });
  const { userLogin } = useFirebaseAuth();

  const onSubmit = handleSubmit(async (values) => {
    const response = await userLogin(values);
    if (response.status === "success") {
      toast.success("Login successful");
    } else {
      toast.error(response.message);
    }
  });

  const colorMode = useColorMode();
</script>
<template>
  <div class="grid place-items-center h-[90vh] text-foreground">
    <Card class="w-[350px] md:w-[380px]">
      <CardHeader class="mb-2 w-full">
        <div class="flex flex-row w-full mb-4">
          <NuxtLink
            to="/"
            class="cursor-pointer flex-row flex space-x-2 items-center justify-center tracking-wider w-full">
            <span class="text-xs font-bold">SendKards</span>
            <span class="text-xs font-bold">Verify</span>
          </NuxtLink>
          <ThemeComponent :expand="false" />
        </div>
        <CardTitle class="text-center">Welcome back</CardTitle>
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
          <FormField v-slot="{ componentField }" name="password" class="w-full">
            <FormItem class="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  class="w-full"
                  placeholder="******"
                  v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <NuxtLink to="/forgot-password">
            <Button variant="link">Forgot password?</Button>
          </NuxtLink>
          <Button class="w-full" type="submit">Login with email</Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
