import { IPage } from "~~/types/IContent";
import { ISEO } from "~~/types/ISEO";

export const usePage = async (pageId: Number) => {
  const { apiUrl } = useAppConfig();

  const { data: page, error } = await useAsyncData(
    `page-${pageId}`,
    async () => {
      const fields = ["title", "content", "yoast_head_json"];
      const includeFields = `&_fields=${fields.join(",")}`;
      const response = await $fetch<{
        title: {
          rendered: string;
        };
        content: {
          rendered: string;
        };
        yoast_head_json: ISEO;
      }>(`${apiUrl}pages/${pageId}?${includeFields}`);
      if (response) {
        return {
          title: response.title.rendered,
          content: response.content.rendered,
          seo: response.yoast_head_json,
        } as IPage;
      }
      return null;
    }
  );

  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: error.value.message,
    });
  }

  useMeta(page);
  return {
    page,
  };
};
