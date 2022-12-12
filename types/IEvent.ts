export interface IEvent {
  name: string;
  date: string;
  venue: string | undefined;
  city: string | undefined;
  url: string;
}

export interface IEventResponse {
  lineup: {
    name: string;
  };
  datetime: string;
  venue: {
    name: string;
    city: string;
  };
  url: string;
}
