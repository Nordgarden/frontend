import { IEvent } from "~~/types/IEvent";

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
      const data = (await $fetch(eventsApiUrl)) as IEvent[];
      if (data) {
        events.value = data;
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
