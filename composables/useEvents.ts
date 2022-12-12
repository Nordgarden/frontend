import { IEvent, IEventResponse } from "~~/types/IEvent";

export const useEvents = () => {
  const isLoading = useState<boolean>("isLoading", () => true);
  const events = useState<IEvent[]>("events", () => []);

  const { eventsApiUrl } = useAppConfig();
  const fetchEvents = async () => {
    try {
      const data = (await $fetch(eventsApiUrl)) as IEventResponse[];
      if (data) {
        events.value = data.map((event) => {
          return {
            name: event.lineup.name,
            date: event.datetime,
            venue:
              event.venue.name !== "Unknown venue"
                ? event.venue.name
                : undefined,
            city: event.venue.city !== "Unknown" ? event.venue.city : undefined,
            url: event.url,
          };
        });
      }
    } catch (error) {
    } finally {
      isLoading.value = false;
    }
  };
  return {
    fetchEvents,
  };
};
