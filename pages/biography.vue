<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: "/biography",
  },
});

const query = gql`
  query Page($pageId: ID!) {
    page(id: $pageId, idType: DATABASE_ID) {
      title
      content
      seo {
        metaDesc
        title
      }
    }
  }
`;

type IPageResult = {
  page: {
    title: string;
    content: string;
  };
};

const { pageId } = useAppConfig();
const { data } = await useAsyncQuery<IPageResult>(query, {
  pageId: pageId.biography,
});

const page = computed(() => {
  if (data.value) {
    return data.value.page;
  }
  return undefined;
});
</script>

<template>
  <div>
    <app-page v-if="page" :title="page.title">
      <BiographyIntro />
      <div v-html="page.content" />
    </app-page>
  </div>
</template>
