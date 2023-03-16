import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";

import fetch from "node-fetch";

const apiUrl = "https://api.nordgarden.info/wp-json/wp/v2/";

const getUrl = ({
  fields,
  type,
  id,
  slug,
  page,
}: {
  fields: string[];
  type: string;
  id?: number;
  slug?: string;
  page?: number;
}) => {
  let baseUrl = `${apiUrl}${type}/`;
  if (id) {
    baseUrl = `${baseUrl}${id}`;
  }
  let url = new URL(baseUrl);
  url.searchParams.set("_fields", fields.join(","));
  if (slug) {
    url.searchParams.set("slug", slug);
  }
  if (page) {
    url.searchParams.set("page", page.toString());
    url.searchParams.set("per_page", "5");
  }
  return url.toString();
};

// const handler: Handler = async (event: HandlerEvent) => {
//   const headers = {
//     "Content-Type": "application/json",
//   };

//   const url = getUrl({
//     id: pageId,
//     type: "pages",
//     fields: ["title", "content", "yoast_head_json"],
//   });

//   const response = await fetch(url);
//   const data = await response.text();
//   return {
//     statusCode: 200,
//     body: data,
//     headers,
//   };
// };

// export { handler };

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };
