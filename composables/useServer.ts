import { title } from "process";
import { IPage, IPost, IPostListItem } from "~~/types/IContent";
import { ISEO } from "~~/types/ISEO";

export const useServer = () => {
  const { apiUrl } = useAppConfig();

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

  const getPosts = async (page: number) => {
    const url = getUrl({
      type: "posts",
      fields: ["title", "excerpt", "date", "slug"],
      page,
    });

    const response = await $fetch.raw(url).catch((error) => error.data);
    console.log(response);
    if (response.status !== 200) {
      return {
        total: 0,
        items: [],
      };
    }
    const total = Number(response.headers.get("x-wp-totalpages")) as number;
    const items = response._data.map((item) => {
      return {
        ...item,
        title: item.title.rendered,
        excerpt: item.excerpt.rendered,
      };
    }) as IPostListItem[];
    return {
      total,
      items,
    };
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
    getPosts,
  };
};
