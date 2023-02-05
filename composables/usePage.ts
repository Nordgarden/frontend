import PageQuery from "~/graphql/Page.gql";
import { IPage } from "~~/types/IContent";

export const usePage = async (pageId: Number) => {
  const { data } = await useAsyncQuery<{ page: IPage }>(PageQuery, {
    pageId: pageId,
  });

  const page = computed(() => {
    if (data.value) {
      return data.value.page;
    }
    return null;
  });

  useMeta(page);
  return {
    page,
  };
};
