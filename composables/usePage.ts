import { IPage } from "~~/types/IContent";

export const usePage = async (pageId: number) => {
  const { contentApiUrl } = useAppConfig();

  const { data: page, error } = useFetch<IPage>("page", {
    key: `page-${pageId}`,
    baseURL: contentApiUrl,
    server: true,
    params: {
      id: pageId,
    },
  });

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
