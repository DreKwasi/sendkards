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
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { CircleUser } from "lucide-vue-next";
  import { Input } from "@/components/ui/input";
  import { toTypedSchema } from "@vee-validate/zod";
  import { useForm } from "vee-validate";
  import * as z from "zod";
  import { toast } from "vue-sonner";

  const { verifySendKard } = useVerifySendKard();
  const { userLogout } = useFirebaseAuth();

  const formSchema = toTypedSchema(
    z.object({
      voucherId: z
        .string()
        .length(19)
        .regex(
          /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/,
          "ID must be in format XXXX-XXXX-XXXX-XXXX"
        ),
    })
  );

  const { handleSubmit, setFieldValue } = useForm({
    validationSchema: formSchema,
    initialValues: {
      voucherId: "",
    },
  });

  const formatVoucherId = (value: string) => {
    // Remove non-alphanumeric characters
    const cleanValue = value.replace(/[^A-Z0-9]/gi, "").toUpperCase();

    // Format with dashes
    let formatted = "";
    for (let i = 0; i < cleanValue.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += "-";
      }
      formatted += cleanValue[i];
    }

    return formatted;
  };

  const handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const cursorPosition = input.selectionStart || 0;
    const valueBeforeFormat = input.value;

    // Format the value
    const formattedValue = formatVoucherId(input.value);

    // Only update if the value changed
    if (valueBeforeFormat !== formattedValue) {
      setFieldValue("voucherId", formattedValue);

      // Calculate new cursor position, accounting for added dashes
      setTimeout(() => {
        const newPosition = cursorPosition + (formattedValue.length - valueBeforeFormat.length);
        input.setSelectionRange(newPosition, newPosition);
      }, 0);
    }
  };

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
      <CardHeader class="flex flex-row items-center justify-between">
        <CardTitle>Verify SendKard</CardTitle>
        <CardDescription></CardDescription>
        <div>
          <div class="flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <DropdownMenu class="bg-background">
              <DropdownMenuTrigger as-child>
                <Button variant="secondary" size="icon" class="rounded-full">
                  <CircleUser class="h-5 w-5" />
                  <span class="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <!-- <DropdownMenuLabel>My Account</DropdownMenuLabel> -->
                <DropdownMenuSeparator />
                <ThemeComponent :expand="true" />
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="() => userLogout()">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form class="w-full space-y-6" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="voucherId">
            <FormItem>
              <FormLabel>Enter Gift Card ID</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  v-bind="componentField"
                  @input="handleInput"
                  maxlength="19" />
              </FormControl>
              <FormDescription>
                Enter the 16-character ID (format: XXXX-XXXX-XXXX-XXXX)
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit"> Submit </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
