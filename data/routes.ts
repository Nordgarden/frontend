import fetch from "node-fetch";

const fetchByType = async (type: string) => {
  const apiUrl = `https://api.nordgarden.info/wp-json/wp/v2/${type}/?_fields[]=slug&per_page=99`;
  const posts = await fetch(apiUrl);
  const data = (await posts.json()) as { slug: string }[];
  return data.map((r) => `/${r.slug}`);
};

export default async () => {
  const posts = await fetchByType("posts");
  return [...posts];
};
