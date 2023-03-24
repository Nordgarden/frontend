import fetch from "node-fetch";
// Make the `request` function generic
// to specify the return data type:
export default async <TResponse>(
  url: string
  // `RequestInit` is a type for configuring
  // a `fetch` request. By default, an empty object.

  // This function is async, it will return a Promise:
): Promise<TResponse> => {
  // Inside, we call the `fetch` function with
  // a URL and config given:
  const response = await fetch(url);
  return (await response.json()) as TResponse;

  // We also can use some post-response
  // data-transformations in the last `then` clause.
};
