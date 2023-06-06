export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
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
}));
