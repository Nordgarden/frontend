export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1,viewport-fit=cover",
        },
      ],
    },
  },
  components: {
    dirs: [
      "~/components/Albums",
      "~/components/Audio",
      "~/components/Biography",
      "~/components/Home",
      "~/components/Layout",
      "~/components/Menu",
      "~/components/Posts",
      "~/components/Shared",
      "~/components/Tour",
      "~/components/Videos",
    ],
  },

  css: ["~/assets/css/base.css"],
  modules: ["@nuxt/image-edge", "@nuxtjs/i18n"],
  i18n: {
    baseUrl: "https://nordgarden.info",
    strategy: "prefix_except_default",
    defaultLocale: "en",
    locales: [{ code: "en", file: "en.json", iso: "en-US" }],
    langDir: "locales",
    vueI18n: {
      datetimeFormats: {
        en: {
          short: {
            year: "numeric",
            month: "long",
            day: "numeric",
          },
          long: {
            year: "numeric",
            month: "short",
            day: "numeric",
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
          },
        },
      },
    },
  },
});
