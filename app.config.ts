export default defineAppConfig({
  mediaSizes: [96, 128, 192, 256, 384, 512],
  eventsApiUrl:
    "https://nuxt-fetch--nordgarden.netlify.app/.netlify/functions/events",
  pageApiUrl:
    "https://nuxt-fetch--nordgarden.netlify.app/.netlify/functions/page",
  postApiUrl:
    "https://nuxt-fetch--nordgarden.netlify.app/.netlify/functions/post",
  postsApiUrl:
    "https://nuxt-fetch--nordgarden.netlify.app/.netlify/functions/posts",
  apiUrl: "https://api.nordgarden.info/wp-json/wp/v2/",

  pageIds: {
    albums: 14,
    biography: 5,
    events: 46,
    home: 152,
    videos: 179,
  },
});
