import { type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import firebase from "firebase/compat/app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.apiKey,
    authDomain: config.public.authDomain,
    projectId: config.public.projectId,
    storageBucket: config.public.storageBucket,
    messagingSenderId: config.public.messagingSenderId,
    appId: config.public.appId,
    measurementId: config.public.measurementId,
  };
  let app: FirebaseApp | null = null;
  if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig as FirebaseOptions);
  }

  const auth = getAuth(app!);
  const db = getFirestore(app!);
  const functions = getFunctions(app!);
  if (import.meta.env.DEV) {
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  }
  const analytics = getAnalytics(app!);
  const storage = getStorage(app!);
  nuxtApp.provide("auth", auth);
  nuxtApp.provide("db", db);
  nuxtApp.provide("functions", functions);
  nuxtApp.provide("analytics", analytics);
  nuxtApp.provide("storage", storage as FirebaseStorage);
});
