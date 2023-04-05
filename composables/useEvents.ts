import { IEvent } from "~~/types/IEvent";

const keys = {
  isLoading: "events/isLoading",
  events: "events/events",
};

export const useEvents = () => {
  const isLoading = useState<boolean>(keys.isLoading, () => true);
  const events = useState<IEvent[]>(keys.events, () => []);

  const { contentApiUrl } = useAppConfig();
  const fetchEvents = async () => {
    try {
      const data = await $fetch<IEvent[]>("events", {
        baseURL: contentApiUrl,
      });
      if (data) {
        events.value = data;
      }
    } catch (error) {
      //
    } finally {
      isLoading.value = false;
    }
  };
  return {
    keys,
    fetchEvents,
  };
};
