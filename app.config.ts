export default defineAppConfig({
  mediaSizes: [96, 128, 192, 256, 384, 512],
  eventsApiUrl: "/.netlify/functions/events",
  pageIds: {
    albums: 14,
    biography: 5,
    events: 46,
    home: 152,
    videos: 179,
  },
});
