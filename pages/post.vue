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
  <app-page :title="post.title" v-if="post">
    <div class="post">
      <post-date :date="post.date" class="date" />
      <div class="text" v-html="post.content" />
    </div>
  </app-page>
  <section class="news-list" aria-labelledby="news-list-title" v-if="post">
    <h1 id="news-list-title">{{ $t("latestPosts") }}</h1>
    <posts-list :not-in="post.databaseId" />
  </section>
</template>

<style lang="postcss" scoped>
  .post {
    display: flex;
    flex-direction: column;
  }

  .text {
    @mixin text-overflow;

    margin-bottom: var(--spacing-l);
  }
</style>
