import { IPage, IPost } from "~~/types/IContent";
import { ComputedRef } from "vue";

export const useMeta = (content: ComputedRef<IPage | IPost | null>) => {
  const getMetaImage = (seo: any, key: string) => {
    if (!seo) {
      return null;
    }

    if (seo[key] && seo[key].mediaItemUrl) {
      return seo[key].mediaItemUrl;
    } else if (seo.opengraphImage) {
      return seo.opengraphImage.mediaItemUrl;
    }
    return null;
  };

  useHead({
    title: content.value?.seo.title,
    meta: [
      {
        name: "description",
        hid: "description",
        content: content.value?.seo.metaDesc,
      },
      // Open Graph
      {
        hid: "og:title",
        name: "og:title",
        content: content.value?.seo.opengraphTitle,
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          content.value?.seo.opengraphDescription ||
          content.value?.seo.metaDesc,
      },
      {
        hid: "og:url",
        name: "og:url",
        content: content.value?.seo.opengraphUrl,
      },
      {
        hid: "og:type",
        name: "og:type",
        content: "article",
      },
      {
        hid: "og:image",
        name: "og:image",
        content: getMetaImage(content.value?.seo, "opengraphImage"),
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: content.value?.seo.twitterTitle || content.value?.seo.title,
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content:
          content.value?.seo.twitterDescription || content.value?.seo.metaDesc,
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: getMetaImage(content.value?.seo, "twitterImage"),
      },
    ],

    script: [
      {
        type: "application/ld+json",
        children: content.value?.seo.schema.raw,
      },
    ],
  });
};
