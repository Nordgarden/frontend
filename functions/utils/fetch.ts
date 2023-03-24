<<<<<<< HEAD
import fetch from 'node-fetch'
// Make the `request` function generic
// to specify the return data type:
export default async <TResponse>(
  url: string
  // `RequestInit` is a type for configuring
  // a `fetch` request. By default, an empty object.
  // config: RequestInit = {}

// This function is async, it will return a Promise:
): Promise<TResponse> => {
  // Inside, we call the `fetch` function with
  // a URL and config given:
  const response = await fetch(url)
  const data = (await response.json()) as TResponse
=======
import fetch from "node-fetch";
// Make the `request` function generic
// to specify the return data type:
export default async <TResponse>(
  url: string,
  // `RequestInit` is a type for configuring
  // a `fetch` request. By default, an empty object.
  config: RequestInit = {}

  // This function is async, it will return a Promise:
): Promise<TResponse> => {
  // Inside, we call the `fetch` function with
  // a URL and config given:
  const response = await fetch(url);
  const data = (await response.json()) as TResponse;
>>>>>>> master
  // const total = Number(response.headers.get("x-wp-totalpages")) as number;
  // if (total) {
  //   return {
  //     data,
  //     number,
  //   } as TResponse;
  // }
<<<<<<< HEAD
  return data

  // We also can use some post-response
  // data-transformations in the last `then` clause.
}
=======
  return data;

  // We also can use some post-response
  // data-transformations in the last `then` clause.
};
>>>>>>> master
