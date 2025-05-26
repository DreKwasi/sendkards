<script setup lang="ts">
  definePageMeta({
    title: "Email Verification",
    name: "email-verification",
    layout: "default",
    middleware: "auth",
  });
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { type Auth } from "firebase/auth";
  import { toast } from "vue-sonner";

  const router = useRouter();
  const { getUser, emailVerificationHandler } = useFirebaseAuth();
  const { $auth } = useNuxtApp();
  const auth = $auth as Auth;
  const feedbackStore = useFeedbackStore();
  const { loading } = storeToRefs(feedbackStore);
  const userStore = useUserStore();
  const { isEmailVerified } = storeToRefs(userStore);

  const sendVerificationEmail = async () => {
    loading.value = true;
    try {
      await emailVerificationHandler();
      toast.info(
        "Email sent. Please check your mail/junk/spam box to complete the password reset process"
      );
    } catch (error) {
      toast.error("Oops! Something went wrong");
    } finally {
      loading.value = false;
    }
  };

  if (!auth.currentUser?.emailVerified) {
    const intervalRef = setInterval(async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        await getUser();
        if (isEmailVerified.value) {
          toast.success("Email verified");
          clearInterval(intervalRef); // Clear the interval
          setTimeout(() => {
            router.push({ name: "account" });
          }, 2000);
        }
      } else {
        clearInterval(intervalRef);
        router.push({ name: "/" });
      }
    }, 2000);
  }
</script>

<template>
  <div class="grid place-items-center h-[90vh]">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Email verification</CardTitle>
      </CardHeader>
      <CardContent>
        A verification link has been sent to your email for security purposes. Check your inbox or
        spam folder. Need a new link? Click below.
      </CardContent>
      <CardFooter>
        <Button @click="sendVerificationEmail" class="w-full">Resend verification email</Button>
      </CardFooter>
    </Card>
  </div>
</template>
