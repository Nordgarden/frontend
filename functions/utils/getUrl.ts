export default ({
  fields,
  type,
  id,
  slug,
  page,
  image,
}: {
  fields: string[];
  type: string;
  id?: string;
  slug?: string;
  page?: string;
  image?: Boolean;
}) => {
  const apiUrl = "https://api.nordgarden.info/wp-json/wp/v2/";

  let baseUrl = `${apiUrl}${type}/`;
  if (id) {
    baseUrl = `${baseUrl}${id}`;
  }
  const url = new URL(baseUrl);
  const allFields = fields;
  if (image) {
    url.searchParams.set("_embed", "true");
    allFields.push("_links");
    allFields.push("_embedded");
  }

  url.searchParams.set("_fields", allFields.join(","));
  if (slug) {
    url.searchParams.set("slug", slug);
  }
  if (page) {
    url.searchParams.set("page", page.toString());
    url.searchParams.set("per_page", "5");
  }
  return url.toString();
};
