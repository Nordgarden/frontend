<script setup lang="ts">
  const route = useRoute();

  const props = defineProps<{
    exclude?: number;
  }>();

  const page = ref(1);

  const { getPosts } = useServer();
  const { data, pending, execute } = await useAsyncData(
    "posts",
    async () => {
      return await getPosts(page.value, props.exclude);
    },
    {
      watch: [page],
      immediate: false,
    }
  );

  const goToPage = (newPage: number) => {
    page.value = newPage;
  };

  onMounted(() => {
    if (route.query.page) {
      page.value = Number(route.query.page);
    }
    execute();
  });
</script>

<template>
  <div
    v-if="data"
    class="wrapper"
  >
    <app-loader v-if="pending" />
    <ul
      v-else-if="data.items.length"
      class="posts"
    >
      <posts-list-item
        v-for="post in data.items"
        :key="post.slug"
        :post="post"
      />
    </ul>
    <p v-else>
      No posts found
    </p>
    <app-paging
      :page="page"
      :total-pages="data.total"
      @go-to-page="goToPage"
    />
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
