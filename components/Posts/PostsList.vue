<script setup lang="ts">
  const route = useRoute();

  const currentPage = route.query.page ? Number(route.query.page) : 1;

  const page = ref(currentPage);
  const { getPosts } = useServer();
  const { data } = await useAsyncData(
    "posts",
    async () => {
      return await getPosts(page.value);
    },
    {
      watch: page,
    }
  );

  const goToPage = (newPage: number) => {
    page.value = newPage;
  };
</script>

<template>
  <div v-if="data" class="wrapper">
    <PostsListItem
      v-if="data.items.length"
      v-for="post in data.items"
      :key="post.slug"
      :post="post"
    />
    <p v-else>No posts found</p>
    <app-paging :page="page" :total-pages="data.total" @go-to-page="goToPage" />
  </div>
</template>

<style lang="postcss" scoped>
  @import "~/assets/css/media-queries/media-queries.css";

  .wrapper {
    margin-bottom: 5em;
  }

  .posts {
    @mixin list-reset;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all var(--animation);
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(var(--spacing-m));
  }

  .button-wrapper {
    @media (--viewport-sm) {
      margin-left: 11em;
    }
  }

  .btn {
    width: 100%;
  }
</style>
