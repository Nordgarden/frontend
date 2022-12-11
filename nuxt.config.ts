export default defineNuxtConfig({
  components: {
    dirs: [
      "~/components/Albums",
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
  modules: ["@nuxt/image-edge", "@nuxtjs/i18n"],
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    lazy: true,
    locales: [{ code: "en", file: "en.json" }],
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
