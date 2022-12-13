<script setup lang="ts">
  import PageQuery from "~/graphql/Page.gql";
  import { IPage } from "~~/types/IContent";

  defineI18nRoute({
    paths: {
      en: "/biography",
    },
  });

  const { pageId } = useAppConfig();
  const { data } = await useAsyncQuery<{ page: IPage }>(PageQuery, {
    pageId: pageId.biography,
  });

  const page = computed(() => {
    if (data.value) {
      return data.value.page;
    }
    return null;
  });

  useMeta(page);
</script>

<template>
  <div>
    <app-page v-if="page" :title="page.title">
      <BiographyIntro />
      <div v-html="page.content" />
    </app-page>
  </div>
</template>
