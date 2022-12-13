<script setup lang="ts">
import PostsQuery from "~/graphql/Posts.gql";

const props = defineProps<{
  notIn?: number;
}>();

const { data } = await useAsyncQuery(PostsQuery, {
  first: props.notIn,
});

const posts = computed(() => {
  if (data.value) {
    return data.value.posts;
  }
  return undefined;
});
</script>

<template>
  <div>
    <transition-group v-if="posts" name="list" tag="ul">
      <app-post
        v-for="post in posts.edges"
        :key="post.node.id"
        :post="post.node"
      />
    </transition-group>
    <!-- <app-loader v-if="$apollo.queries.posts.loading" /> -->
    <!-- <div v-else-if="posts && posts.pageInfo.hasNextPage" class="button-wrapper">
      <button class="btn" @click="showMore">
        {{ $t("loadMore") }}
      </button>
    </div> -->
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

.list-enter,
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
