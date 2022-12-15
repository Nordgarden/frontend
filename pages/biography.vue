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

  const { data: count }: { data: IPage | null } = await useFetch<{
    data: IPage | null;
  }>("https://api.nordgarden.info/wp-json/wp/v2/pages/5", {
    params: {
      _fields: "slug,id,title,content,seo",
    },
  });

  // useMeta(page);
</script>

<template>
  <app-page v-if="page" :title="page.title">
    {{ count }}
    <div class="text">
      <BiographyIntro />
      <div v-html="page.content" />
    </div>
  </app-page>
</template>

<style lang="postcss" scoped>
  .text {
    @mixin text-overflow;

    max-width: 60ch;
  }
</style>
