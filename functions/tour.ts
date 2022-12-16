import fetch from "node-fetch";

const API_ENDPOINT = "https://icanhazip.com/";

export async function handler() {
  const response = await fetch(API_ENDPOINT);
  const data = await response.text();
  return {
    statusCode: 200,
    body: `AWS IP is ${data}`,
  };
}
