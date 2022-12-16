import mockEvents from "./mockEvents.json";

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify(mockEvents),
    headers: {
      "Content-Type": "application/json",
    },
  };
}
