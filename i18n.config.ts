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
  messages: {
    en: {
      home: "Home",
      tour: "Tour",
      albums: "Albums",
      biography: "Biography",
      videos: "Videos",
      menu: "Menu",
      close: "Close",
      mainNavigation: "Main navigation",
      morePosts: "More posts",
      loadMore: "Load more posts",
      readMore: "Read more",
      loading: "Loading…",
      noTourDays: "No tour dates confirmed",
      play: "Play",
      pause: "Pause",
      next: "Next",
      visitOn: "Visit %{title} on %{network}",
      viewOn: "View %{title} on %{network}",
      socialMediaLinks: "Social media links",
      readFullBiography: "Read the full biography",
      gallery: "Gallery",
      paging: {
        previous: "Previous page",
        next: "Next page",
      },
      errors: {
        error404: "Page not found",
      },
    },
  },
}));
