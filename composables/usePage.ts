import { IPage } from "~~/types/IContent";

export const usePage = async (pageId: number) => {
  const { data: page, error } = useFetch<IPage>(
    `/.netlify/functions/page?id=${pageId}`
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
