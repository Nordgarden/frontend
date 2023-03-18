import { IPage, IPost, IPostListItem } from "~~/types/IContent";
import {
  IResponseImage,
  IResponsePage,
  IResponsePost,
  IResponsePosts,
} from "~~/types/IResponse";

export const useServer = () => {
  const { apiUrl } = useAppConfig();

  const getFeaturedImage = (featuredImage: IResponseImage) => {
    if (!featuredImage["wp:featuredmedia"]) {
      return null;
    }
    const image = featuredImage["wp:featuredmedia"][0];
    const srcSet = Object.values(image.media_details.sizes).map((size) => {
      return `${size?.source_url} ${size?.width}w`;
    });

    return {
      alt: image.alt_text,
      width: image.media_details.width,
      height: image.media_details.height,
      src: image.source_url,
      srcSet: srcSet.join(","),
    };
  };

  const getUrl = ({
    fields,
    type,
    id,
    slug,
    page,
    image,
  }: {
    fields: string[];
    type: string;
    id?: number;
    slug?: string;
    page?: number;
    image?: Boolean;
  }) => {
    let baseUrl = `${apiUrl}${type}/`;
    if (id) {
      baseUrl = `${baseUrl}${id}`;
    }
    let url = new URL(baseUrl);
    if (image) {
      url.searchParams.set("_embed", "true");
      fields.push("_links");
      fields.push("_embedded");
    }
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
      image: true,
    });
    const response = await $fetch<IResponsePost[]>(url);

    if (response.length) {
      const featuredImage = getFeaturedImage(response[0]._embedded);
      return {
        title: response[0].title.rendered,
        content: response[0].content.rendered,
        seo: response[0].yoast_head_json,
        date: response[0].date,
        featuredImage,
      } as IPost;
    }
    return null;
  };

  const getPosts = async (page: number) => {
    const url = getUrl({
      type: "posts",
      fields: ["title", "excerpt", "date", "slug"],
      page,
      image: true,
    });

    const response = await $fetch.raw(url).catch((error) => error.data);
    if (response.status !== 200) {
      return {
        total: 0,
        items: [],
      };
    }
    const total = Number(response.headers.get("x-wp-totalpages")) as number;
    const items = response._data.map((item: IResponsePosts) => {
      const featuredImage = getFeaturedImage(item._embedded);

      return {
        title: item.title.rendered,
        excerpt: item.excerpt.rendered,
        date: item.date,
        featuredImage,
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
    const response = await $fetch<IResponsePage>(url);
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
