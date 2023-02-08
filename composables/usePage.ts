import { IPage } from "~~/types/IContent";
import { ISEO } from "~~/types/ISEO";
import { useServer } from "./useServer";

export const usePage = async (pageId: number) => {
  const { getPage } = useServer();

  const { data: page, error } = await useAsyncData(
    `page-${pageId}`,
    async () => {
      return await getPage(pageId);
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
