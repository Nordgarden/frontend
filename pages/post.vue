<script setup lang="ts">
  import { IPost } from "~~/types/IContent";
  import { ISEO } from "~~/types/ISEO";

  defineI18nRoute({
    paths: {
      en: "/:slug",
    },
  });

  const route = useRoute();
  const { apiUrl } = useAppConfig();

  const { data: post, error } = await useAsyncData(
    `post-${route.params.slug}`,
    async () => {
      const fields = ["title", "content", "yoast_head_json", "date"];
      const includeFields = `&_fields=${fields.join(",")}`;
      const response = await $fetch<
        {
          title: {
            rendered: string;
          };
          content: {
            rendered: string;
          };
          yoast_head_json: ISEO;
          date: string;
        }[]
      >(`${apiUrl}posts/?slug=${route.params.slug}?${includeFields}`);
      if (response.length) {
        return {
          title: response[0].title.rendered,
          content: response[0].content.rendered,
          seo: response[0].yoast_head_json,
          date: response[0].date,
        } as IPost;
      }
      return null;
    }
  );

  if (!post.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
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
    <posts-list :not-in="post.databaseId" />
  </section>
</template>

<style lang="postcss" scoped>
  .text {
    margin-bottom: var(--spacing-l);
  }
</style>
