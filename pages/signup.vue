<script setup lang="ts">
  definePageMeta({
    title: "Sign up",
    layout: "default",
    name: "signup",
    middleware: "no-auth",
  });

  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { toast } from "vue-sonner";
  import type { CreateUserCredentials } from "~/types/firebaseAuthTypes";

  const formSchema = toTypedSchema(
    z.object({
      first_name: z.string({ message: "First name is required" }),
      last_name: z.string({ message: "Last name is required" }),
      email: z.string({ message: "Email is required" }).email("Enter a valid email"),
      phone_number: z
        .string({ message: "Enter your last nine digits" })
        .regex(/^\d{9}$/, "Enter your last nine digits"),
      passwords: z
        .object({
          password: z
            .string({ message: "Password is required" })
            .min(8, "Input at least 8 characters"),
          confirm_password: z.string({ message: "Confirm password" }).min(8, "Confirm password"),
        })
        .partial()
        .refine(
          (data) => {
            return data.confirm_password === data.password;
          },
          {
            message: "The passwords did not match",
            path: ["confirm_password"],
          }
        ),
    })
  );

  const { handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {},
  });

  const { createUser } = useFirebaseAuth();
  const router = useRouter();
  const onSubmit = handleSubmit(async (values) => {
    const { passwords, ...userCred } = values;
    const password = passwords.password as string;
    const response = await createUser({ ...userCred, password: password } as CreateUserCredentials);
    if (response.status === "success") {
      toast.success(response.message);
      router.push({ name: "email-verification" });
    } else {
      toast.error(response.message);
    }
  });
  const colorMode = useColorMode();
</script>

<template>
  <div class="grid place-items-center h-[90vh]">
    <Card class="w-[350px] md:w-[380px]">
      <CardHeader class="mb-2">
        <NuxtLink
          to="/"
          class="cursor-pointer flex-row flex items-center justify-center space-x-2 mb-4">
          <span>Sendkards</span>
          <span class="text-xs font-bold tracking-wider">Verify</span>
        </NuxtLink>
        <CardTitle class="text-center">Get started</CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="grid place-items-start gap-y-4 w-full">
          <div class="flex flex-row justify-between items-start space-x-3">
            <FormField v-slot="{ componentField }" name="first_name" class="w-full">
              <FormItem class="w-full">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input class="w-full" placeholder="John" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="last_name" class="w-full">
              <FormItem class="w-full">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input class="w-full" placeholder="Wick" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <FormField v-slot="{ componentField }" name="email" class="w-full">
            <FormItem class="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input class="w-full" placeholder="johnwick@email.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="phone_number" class="w-full">
            <FormItem class="w-full">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input class="w-full" placeholder="541927797" v-bind="componentField" type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="passwords.password" class="w-full">
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
          <FormField v-slot="{ componentField }" name="passwords.confirm_password" class="w-full">
            <FormItem class="w-full">
              <FormLabel>Confirm password</FormLabel>
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
          <Button class="w-full" type="submit">Sign up with email</Button>
        </form>
        <div class="w-full flex flex-col space-y-2 items-center">
          <p>
            Already have an account?
            <NuxtLink to="/"><Button variant="link">Login</Button></NuxtLink>
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
