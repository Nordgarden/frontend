import { Handler, HandlerEvent } from "@netlify/functions";

import fetch from "node-fetch";
const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch("https://api.nordgarden.info/graphql", {
    method: "POST",
    body: event.body,
    headers,
  });
  const data = await response.text();
  return {
    statusCode: 200,
    body: data,
    headers,
  };
};

export { handler };
