<script setup lang="ts">
  defineI18nRoute({
    paths: {
      en: "/:slug",
    },
  });

  const route = useRoute();
  const { getPost } = useServer();

  const { data: post, error } = await useAsyncData(
    `post-${route.params.slug}`,
    async () => {
      if (Array.isArray(route.params.slug)) {
        return await getPost(route.params.slug.join(","));
      }
      return await getPost(route.params.slug);
    }
  );

  if (!post.value || error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }

  useMeta(post);

  const component = computed(() => {
    if (post.value?.featuredImage) {
      return resolveComponent("image-wrapper");
    }
    return "div";
  });
</script>

<template>
  <app-page :title="post.title" v-if="post">
    <component :is="component" :image="post.featuredImage">
      <div class="post">
        <post-date :date="post.date" class="date" />
        <div class="text" v-html="post.content" />
      </div>
    </component>
  </app-page>
  <section class="news-list" aria-labelledby="news-list-title" v-if="post">
    <h1 id="news-list-title">{{ $t("morePosts") }}</h1>
    <posts-list :exclude="post.id" />
  </section>
</template>

<style lang="postcss" scoped>
  .text {
    margin-bottom: var(--spacing-l);
  }
</style>
