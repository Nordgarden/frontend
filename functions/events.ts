import { Handler } from "@netlify/functions";

import mockEvents from "./mockEvents.json";

const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(mockEvents),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export { handler };
