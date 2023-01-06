import { Handler, HandlerEvent } from "@netlify/functions";

import fetch from "node-fetch";

const url =
  "https://rest.bandsintown.com/artists/Nordgarden/events?app_id=TerjeNordgardenWebsite";
const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(url);
  const data = await response.text();
  return {
    statusCode: 200,
    body: data,
    headers,
  };
};

export { handler };
