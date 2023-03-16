const apiUrl = "https://api.nordgarden.info/";

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
  nitro: {
    preset: "netlify-builder",
  },
  // hooks: {
  //   async "nitro:config"(nitroConfig) {
  //     if (nitroConfig.dev) {
  //       return;
  //     }
  //     let slugs = await routes();
  //     // @ts-ignore
  //     nitroConfig.prerender.routes.push(...slugs);
  //     return;
  //   },
  // },
  pwa: {
    workbox: {
      // importScripts: ['/badge.js', '/update.js'],
      templatePath: "~/public/sw.js",
    },
    manifest: {
      description:
        "Nordgarden is a Norwegian artist deriving from the American old school of classic songwriting.",
      name: "Nordgarden",
      background_color: "#fff",
      theme_color: "#ca242c",
      short_name: "Nordgarden",
      orientation: "portrait-primary",
      shortcuts: [
        {
          name: "Tour",
          short_name: "Tour",
          url: "/tour",
          icons: [],
        },
        {
          name: "Albums",
          short_name: "Albums",
          url: "/albums",
          icons: [],
        },
        {
          name: "Videos",
          short_name: "Videos",
          url: "/videos",
          icons: [],
        },
        {
          name: "Biography",
          short_name: "Biography",
          url: "/biography",
          icons: [],
        },
      ],
      categories: ["music"],
      // screenshots: [
      //   {
      //     src: "/screenshots/desktop-home.png",
      //     sizes: "1280x800",
      //     type: "image/png",
      //   },
      //   {
      //     src: "/screenshots/desktop-albums.png",
      //     sizes: "1280x800",
      //     type: "image/png",
      //   },
      //   {
      //     src: "/screenshots/mobile-home.png",
      //     sizes: "375x667",
      //     type: "image/png",
      //   },
      //   {
      //     src: "/screenshots/mobile-albums.png",
      //     sizes: "375x667",
      //     type: "image/png",
      //   },
      // ],
    },
    icon: {
      maskablePadding: 0,
    },
    meta: {
      ogSiteName: "Nordgarden",
      appleStatusBarStyle: "black-translucent",
      title: "Nordgarden",
      mobileApp: true,
      mobileAppIOS: true,
      theme_color: "#ca242c",
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
      ],
      link: [
        {
          type: "application/atom+xml",
          rel: "alternate",
          href: `${apiUrl}feed/`,
          title: "News - Nordgarden",
        },
        {
          rel: "dns-prefetch",
          href: apiUrl,
        },
      ],
    },
  },
  components: {
    dirs: [
      "~/components/Albums",
      "~/components/Audio",
      "~/components/Biography",
      "~/components/Events",
      "~/components/Home",
      "~/components/Images",
      "~/components/Layout",
      "~/components/Menu",
      "~/components/Posts",
      "~/components/Shared",
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
  css: ["~/assets/css/base.css"],
  modules: ["@nuxtjs/i18n", "nuxt-svgo", "@kevinmarrec/nuxt-pwa"],
  i18n: {
    baseUrl: "https://nordgarden.info",
    strategy: "prefix_except_default",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        iso: "en-US",
      },
    ],
    vueI18n: {
      legacy: false,

      datetimeFormats: {
        en: {
          short: {
            year: "2-digit",
            month: "numeric",
            day: "numeric",
          },
          long: {
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        },
      },
    },
  },
});
