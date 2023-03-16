import { IPage } from "~~/types/IContent";

export const usePage = async (pageId: number) => {
  const { pageApiUrl } = useAppConfig();

  const { data: page, error } = useFetch<IPage>(`${pageApiUrl}?id=${pageId}`);

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
