import { IFeaturedImage, IPage, IPost, IPostListItem } from "~~/types/IContent";
import { ISEO } from "~~/types/ISEO";

export const useServer = () => {
  const { apiUrl } = useAppConfig();

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
        _embedded: {
          "wp:featuredmedia"?: {
            alt_text: string;
            source_url: string;
            media_details: {
              width: number;
              heigth: number;
              sizes: [
                thumbnail: {
                  width: number;
                  heigth: number;
                  source_url: string;
                },
                full: {
                  width: number;
                  heigth: number;
                  source_url: string;
                },
                medium?: {
                  width: number;
                  heigth: number;
                  source_url: string;
                },
                large?: {
                  width: number;
                  heigth: number;
                  source_url: string;
                },
                medium_large?: {
                  width: number;
                  heigth: number;
                  source_url: string;
                }
              ];
            };
          }[];
        };
      }[]
    >(url);

    if (response.length) {
      let featuredImage: null | IFeaturedImage = null;

      if (response[0]._embedded["wp:featuredmedia"]) {
        const image = response[0]._embedded["wp:featuredmedia"][0];
        const srcSet = Object.values(image.media_details.sizes).map((size) => {
          return `${size?.source_url} ${size?.width}w`;
        });
        featuredImage = {
          alt: image.alt_text,
          width: image.media_details.width,
          height: image.media_details.heigth,
          src: image.source_url,
          srcSet: srcSet.join(","),
        };
      }
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
