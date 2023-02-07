// import PageQuery from "~/graphql/Page.gql";
import { IPage } from "~~/types/IContent";
import { ISEO } from "~~/types/ISEO";

export const usePage = async (pageId: Number) => {
  // const { data } = await useAsyncQuery<{ page: IPage }>(PageQuery, {
  //   pageId: pageId,
  // });

  // const page = computed(() => {
  //   if (data.value) {
  //     return data.value.page;
  //   }
  //   return null;
  // });

  const { apiUrl } = useAppConfig();

  const fields = ["title", "content", "yoast_head_json"];

  const { data: page, error } = await useAsyncData(
    `page-${pageId}`,
    async () => {
      let includeFields = "";
      fields.forEach((field) => {
        includeFields += `&_fields[]=${field}`;
      });
      const response = await $fetch<{
        title: {
          rendered: string;
        };
        content: {
          rendered: string;
        };
        date: string;
        yoast_head_json: ISEO;
      }>(`${apiUrl}pages/${pageId}?${includeFields}&_embed`);
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
