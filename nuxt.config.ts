export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["@types/body-scroll-lock"],
      },
    },
  },
  nitro: {
    preset: "netlify-edge",
  },
  telemetry: false,
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
      "~/components/Events",
      "~/components/Videos",
    ],
  },

  postcss: {
    plugins: {
      "postcss-import": {},
      "postcss-url": {},
      cssnano: true,
      "postcss-mixins": {
        mixinsDir: "./assets/css/mixins/",
      },

      "postcss-preset-env": {
        importFrom: ["./assets/css/media-queries/media-queries.css"],

        features: {
          "nesting-rules": true,
          "custom-media-queries": true,
          "media-query-ranges": true,
        },
      },
    },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://api.nordgarden.info/graphql",
      },
    },
  },
  css: ["~/assets/css/base.css"],
  modules: ["@nuxt/image-edge", "@nuxtjs/i18n", "@nuxtjs/apollo", "nuxt-svgo"],
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
