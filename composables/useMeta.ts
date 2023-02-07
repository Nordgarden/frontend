import { IPage, IPost } from "~~/types/IContent";
import { ComputedRef, Ref } from "vue";

export const useMeta = (
  content: Ref<IPage | null> | ComputedRef<IPost | null>
) => {
  useServerSeoMeta({
    ogUrl: () => content.value?.seo.og_url,
    ogTitle: () => content.value?.seo.og_title || content.value?.seo.title,
    description: () => content.value?.seo.description,
    ogDescription: () =>
      content.value?.seo.og_description || content.value?.seo.description,
    ogType: () => content.value?.seo.og_type,
    ogImage: () => content.value?.seo.og_image?.mediaItemUrl,
    twitterTitle: () =>
      content.value?.seo.twitterTitle || content.value?.seo.title,
    twitterDescription: () =>
      content.value?.seo.twitterDescription || content.value?.seo.description,
    twitterImage: () => content.value?.seo.twitterImage?.mediaItemUrl,
  });

  useHead({
    title: content.value?.seo.title,
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify(content.value?.seo.schema),
      },
    ],
  });
};
