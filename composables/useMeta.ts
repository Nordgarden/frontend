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
        content: content.value?.seo.metaDesc,
      },
      {
        name: "og:title",
        content: content.value?.seo.opengraphTitle,
      },
      {
        name: "og:description",
        content:
          content.value?.seo.opengraphDescription ||
          content.value?.seo.metaDesc,
      },
      {
        name: "og:url",
        content: content.value?.seo.opengraphUrl,
      },
      {
        name: "og:type",
        content: "article",
      },
      {
        name: "og:image",
        content: getMetaImage(content.value?.seo, "opengraphImage"),
      },
      {
        name: "twitter:title",
        content: content.value?.seo.twitterTitle || content.value?.seo.title,
      },
      {
        name: "twitter:description",
        content:
          content.value?.seo.twitterDescription || content.value?.seo.metaDesc,
      },
      {
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
