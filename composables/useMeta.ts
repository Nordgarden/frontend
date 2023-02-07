import { IPage, IPost } from "~~/types/IContent";
import { ComputedRef, Ref } from "vue";

export const useMeta = (content: Ref<IPage> | ComputedRef<IPost | null>) => {
  useServerSeoMeta({
    ogUrl: () => content.value?.seo.opengraphUrl,
    ogTitle: () =>
      content.value?.seo.opengraphTitle || content.value?.seo.title,
    description: () => content.value?.seo.metaDesc,
    ogDescription: () =>
      content.value?.seo.opengraphDescription || content.value?.seo.metaDesc,
    ogType: () => content.value?.seo.opengraphType,
    ogImage: () => content.value?.seo.opengraphImage?.mediaItemUrl,
    twitterTitle: () =>
      content.value?.seo.twitterTitle || content.value?.seo.title,
    twitterDescription: () =>
      content.value?.seo.twitterDescription || content.value?.seo.metaDesc,
    twitterImage: () => content.value?.seo.twitterImage?.mediaItemUrl,
  });

  useHead({
    title: content.value?.seo.title,
    script: [
      {
        type: "application/ld+json",
        children: content.value?.seo.schema.raw,
      },
    ],
  });
};
