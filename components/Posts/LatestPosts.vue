<script setup lang="ts">
  import { useContext } from "unctx";
  import PostsQuery from "~/graphql/Posts.gql";
  import { IPosts } from "~~/types/IContent";

  const props = defineProps<{
    notIn?: number;
  }>();
  const { $apollo } = useNuxtApp();

  const { data } = await useAsyncQuery<{
    posts: IPosts;
  }>(PostsQuery, {
    notIn: props.notIn,
  });

  const loading = ref(false);
  const loadMore = async () => {
    if (!data.value) {
      return;
    }
    loading.value = true;
    try {
      const { data: moreData }: { data: { posts: IPosts } } =
        await $apollo.defaultClient.query({
          query: PostsQuery,
          variables: {
            first: 2,
            notIn: props.notIn,
            after: data.value.posts.pageInfo.endCursor,
          },
        });
      data.value = {
        posts: {
          pageInfo: moreData.posts.pageInfo,
          edges: [...data.value.posts.edges, ...moreData.posts.edges],
        },
      };
    } finally {
      loading.value = false;
    }
  };
</script>

<template>
  <div v-if="data">
    <transition-group name="list" tag="ul">
      <app-post
        v-for="post in data.posts.edges"
        :key="post.node.id"
        :post="post.node"
      />
    </transition-group>
    <app-loader v-if="loading" />
    <div v-else-if="data.posts.pageInfo.hasNextPage" class="button-wrapper">
      <button class="btn" @click="loadMore">
        {{ $t("loadMore") }}
      </button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
  .news-list {
    margin-bottom: 5em;
  }

  ul {
    @mixin list-reset;

    display: grid;
    grid-gap: var(--spacing-l);
    grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.2s;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(var(--spacing-m));
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
  }

  .btn {
    width: 100%;
  }
</style>
