<script setup lang="ts">
  import PostQuery from "~/graphql/Post.gql";
  import { IPost } from "~~/types/IContent";

  defineI18nRoute({
    paths: {
      en: "/:slug",
    },
  });

  const route = useRoute();

  const { data } = await useAsyncQuery<{ post: IPost }>(PostQuery, {
    uri: route.params.slug,
  });

  const post = computed(() => {
    if (data.value) {
      return data.value.post;
    }
    return null;
  });
  useMeta(post);
</script>

<template>
  <app-page :title="post.title" class="post" v-if="post">
    <post-date :date="post.date" class="date" />
    <div class="text" v-html="post.content" />
    <section class="news-list" aria-labelledby="news-list-title">
      <h1 id="news-list-title">{{ $t("latestPosts") }}</h1>
      <posts-list :not-in="post.databaseId" />
    </section>
  </app-page>
</template>

<style lang="postcss" scoped>
  .post {
    display: flex;
    flex-direction: column;
  }

  .text {
    max-width: 60ch;
    margin-bottom: var(--spacing-l);
  }
</style>
