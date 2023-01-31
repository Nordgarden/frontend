import fetch from "node-fetch";

export default async () => {
  const apiUrl =
    "https://api.nordgarden.info/wp-json/wp/v2/posts/?_fields[]=slug&per_page=99";
  const response = await fetch(apiUrl);
  const data = await response.json();
  const routes = data.map((r) => `/${r.slug}`);
  return routes;
};
