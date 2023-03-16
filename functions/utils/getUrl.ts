export default ({
  fields,
  type,
  id,
  slug,
  page,
}: {
  fields: string[];
  type: string;
  id?: string;
  slug?: string;
  page?: number;
}) => {
  const apiUrl = "https://api.nordgarden.info/wp-json/wp/v2/";

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
