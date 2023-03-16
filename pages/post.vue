<script setup lang="ts">
import { IPost } from "~~/types/IContent";

defineI18nRoute({
  paths: {
    en: "/:slug",
  },
});

const route = useRoute();
const t = useI18n();
const { postApiUrl } = useAppConfig();

const { data: post, error } = useFetch<IPost>(postApiUrl, {
  key: route.params.slug as string,
  server: true,
  params: {
    slug: route.params.slug,
  },
});

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t("errors.error404"),
    fatal: true,
  });
}

useMeta(post);

const image = computed(() => {
  // if (data.value?.post.featuredImage) {
  //   return data.value?.post.featuredImage.node;
  // }
  return undefined;
});

const component = computed(() => {
  if (image.value) {
    return resolveComponent("image-wrapper");
  }
  return "div";
});
</script>

<template>
  <app-page :title="post.title" v-if="post">
    <component :is="component" :image="image">
      <div class="post">
        <post-date :date="post.date" class="date" />
        <div class="text" v-html="post.content" />
      </div>
    </component>
  </app-page>
  <section class="news-list" aria-labelledby="news-list-title" v-if="post">
    <h1 id="news-list-title">{{ $t("latestPosts") }}</h1>
    <posts-list />
  </section>
</template>

<style lang="postcss" scoped>
.text {
  margin-bottom: var(--spacing-l);
}
</style>
