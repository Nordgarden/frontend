import { IEvent, IEventResponse } from "~~/types/IEvent";

const keys = {
  isLoading: "events/isLoading",
  events: "events/events",
};

export const useEvents = () => {
  const isLoading = useState<boolean>(keys.isLoading, () => true);
  const events = useState<IEvent[]>(keys.events, () => []);

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
    keys,
    fetchEvents,
  };
};