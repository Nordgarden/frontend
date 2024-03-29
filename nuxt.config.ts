import routes from "./data/routes";
const apiUrl = "https://api.nordgarden.info/";

export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      compilerOptions: {
        lib: ["dom"],
        isolatedModules: true,
        esModuleInterop: true,
        types: ["@types/body-scroll-lock", "vite-plugin-pwa/client"],
      },
    },
    strict: true,
  },

  nitro: {
    preset: "netlify",
  },
  hooks: {
    async "nitro:config"(nitroConfig) {
      if (nitroConfig.dev) {
        return;
      }
      const slugs = await routes();
      // @ts-ignore
      nitroConfig.prerender.routes.push(...slugs);
    },
  },
  pwa: {
    registerWebManifestInRouteRules: true,
    manifest: {
      description:
        "Nordgarden is a Norwegian artist deriving from the American old school of classic songwriting.",
      name: "Nordgarden",
      background_color: "#fff",
      theme_color: "#ca242c",
      short_name: "Nordgarden",
      orientation: "portrait-primary",
      icons: [
        {
          src: "/icons/192x192.png",
          type: "image/png",
          sizes: "192x192",
          purpose: "any",
        },
        {
          src: "/icons/192x192.maskable.png",
          type: "image/png",
          sizes: "192x192",
          purpose: "maskable",
        },
        {
          src: "/icons/512x512.png",
          type: "image/png",
          sizes: "512x512",
          purpose: "any",
        },
        {
          src: "/icons/512x512.maskable.png",
          type: "image/png",
          sizes: "512x512",
          purpose: "maskable",
        },
      ],

      categories: ["music"],
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
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },

        { name: "apple-mobile-web-app-title", content: "Nordgarden" },
        { name: "theme-color", content: "#ca242c" },
        { property: "og:site_name", content: "Nordgarden" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "TerjeNordgarden" },
        { name: "twitter:creator", content: "TerjeNordgarden" },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          href: "/icons/512x512.maskable.png",
          sizes: "512x512",
        },
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
  modules: ["@nuxtjs/i18n", "nuxt-svgo", "@vite-pwa/nuxt"],
  i18n: {
    baseUrl: "https://nordgarden.info",
    strategy: "prefix_except_default",
    defaultLocale: "en",
    lazy: true,
    langDir: "locales",
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
      },
    ],
  },
});
