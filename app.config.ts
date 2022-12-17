export default defineAppConfig({
  // toursApiUrl:
  //   "https://rest.bandsintown.com/artists/Nordgarden/events?app_id=TerjeNordgardenWebsite",
  mediaSizes: [96, 128, 192, 256, 384, 512],
  eventsApiUrl: "/.netlify/functions/events",
  pageId: {
    biography: 5,
  },
});
