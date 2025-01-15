// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  pages: true,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no",
    },
  },
  components: [{ path: "~/components", pathPrefix: false }],
  runtimeConfig: {
    public: {
      apiKey: process.env.NUXT_APIKEY,
      authDomain: process.env.NUXT_AUTHDOMAIN,
      projectId: process.env.NUXT_PROJECTID,
      storageBucket: process.env.NUXT_STORAGEBUCKET,
      messagingSenderId: process.env.NUXT_MESSAGINGSENDERID,
      appId: process.env.NUXT_APPID,
      measurementId: process.env.NUXT_MEASUREMENTID,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@pinia/nuxt",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  colorMode: {
    preference: "dark",
    fallback: "light",
    classPrefix: "",
    classSuffix: "",
    storage: "localStorage", // or 'sessionStorage' or 'cookie'
    storageKey: "nuxt-color-mode",
  },
});


