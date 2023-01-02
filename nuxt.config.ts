import routes from "./data/routes";

export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      compilerOptions: {
        isolatedModules: true,
        esModuleInterop: true,
        types: ["@types/body-scroll-lock", "@types/workbox-window"],
      },
    },
  },
  generate: {
    routes,
  },
  nitro: {
    preset: "netlify",
  },
  pwa: {
    manifest: {
      name: "Nordgarden",
      background_color: "#dcac4c",
      theme_color: "#dcac4c",
      short_name: "Nordgarden",
      orientation: "portrait-primary",
      // shortcuts: [
      //   {
      //     name: "Tour",
      //     short_name: "Tour",
      //     url: "/tour",
      //     icons: [],
      //   },
      //   {
      //     name: "Albums",
      //     short_name: "Albums",
      //     url: "/albums",
      //     icons: [],
      //   },
      //   {
      //     name: "Videos",
      //     short_name: "Videos",
      //     url: "/videos",
      //     icons: [],
      //   },
      //   {
      //     name: "Biography",
      //     short_name: "Biography",
      //     url: "/biography",
      //     icons: [],
      //   },
      // ],
      categories: ["music"],
      screenshots: [
        {
          src: "/screenshots/desktop-home.png",
          sizes: "1280x800",
          type: "image/png",
        },
        {
          src: "/screenshots/desktop-albums.png",
          sizes: "1280x800",
          type: "image/png",
        },
        {
          src: "/screenshots/mobile-home.png",
          sizes: "375x667",
          type: "image/png",
        },
        {
          src: "/screenshots/mobile-albums.png",
          sizes: "375x667",
          type: "image/png",
        },
      ],
    },
    meta: {
      mobileApp: true,
      mobileAppIOS: true,
      theme_color: "#dcac4c",
      twitterCard: "summary_large_image",
      twitterCreator: "TerjeNordgarden",
      twitterSite: "TerjeNordgarden",
    },
  },
  telemetry: false,
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1,viewport-fit=cover",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
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
        // httpEndpoint: "/.netlify/functions/graphql",
      },
    },
  },
  css: ["~/assets/css/base.css"],
  modules: [
    "@nuxt/image-edge",
    "@nuxtjs/i18n",
    "@nuxtjs/apollo",
    "nuxt-svgo",
    "@kevinmarrec/nuxt-pwa",
  ],
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
