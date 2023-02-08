import { IPage, IPost } from "~~/types/IContent";
import { ISEO } from "~~/types/ISEO";

export const useServer = () => {
  const { apiUrl } = useAppConfig();

  const getUrl = ({
    fields,
    type,
    id,
    slug,
  }: {
    fields: string[];
    type: string;
    id?: number;
    slug?: string;
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
    return url.toString();
  };

  const getPost = async (slug: string) => {
    const url = getUrl({
      slug,
      type: "posts",
      fields: ["title", "content", "yoast_head_json", "date"],
    });
    const response = await $fetch<
      {
        title: {
          rendered: string;
        };
        content: {
          rendered: string;
        };
        yoast_head_json: ISEO;
        date: string;
      }[]
    >(url);
    if (response.length) {
      return {
        title: response[0].title.rendered,
        content: response[0].content.rendered,
        seo: response[0].yoast_head_json,
        date: response[0].date,
      } as IPost;
    }
    return null;
  };

  const getPage = async (pageId: number) => {
    const url = getUrl({
      id: pageId,
      type: "pages",
      fields: ["title", "content", "yoast_head_json"],
    });
    const response = await $fetch<{
      title: {
        rendered: string;
      };
      content: {
        rendered: string;
      };
      yoast_head_json: ISEO;
    }>(url);
    if (response) {
      return {
        title: response.title.rendered,
        content: response.content.rendered,
        seo: response.yoast_head_json,
      } as IPage;
    }
    return null;
  };
  return {
    getPage,
    getPost,
  };
};
