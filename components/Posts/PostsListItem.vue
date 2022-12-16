<script setup lang="ts">
import { IPost } from "~~/types/IContent";
const localePath = useLocalePath();
const props = defineProps<{
  post: IPost;
}>();
const router = useRouter();
const url = localePath({
  name: "post",
  params: {
    slug: props.post.slug,
  },
});

const goToPost = () => {
  router.push(url);
};
</script>

<template>
  <ClickableListItem @click="goToPost" class="post">
    <h2>
      <router-link :to="url"><span v-html="post.title" /></router-link>
    </h2>
    <post-date :date="post.date" class="date" />
    <div class="text" v-html="post.excerpt" />
    <div class="link-wrapper">
      <span class="read-more">
        {{ $t("readMore") }}
        <app-icon icon="chevron-right" :size="16" />
      </span>
    </div>
    <featured-image
      v-if="post.featuredImage"
      :image="post.featuredImage.node"
      class="image"
      sizes="sm:100vw md:50vw lg:400px"
    />
  </ClickableListItem>
</template>

<style lang="postcss" scoped>
.post {
  display: flex;
  flex-direction: column;
  padding-bottom: var(--spacing-m);
  border-bottom: 2px dashed var(--color-white);

  &:hover .read-more,
  &:focus-within .read-more {
    text-decoration-thickness: 3px;

    & svg {
      margin-left: var(--spacing-xxs);
    }
  }
}

a {
  @mixin link-reset;
}

.image {
  order: -2;
  margin-bottom: var(--spacing-xs);
  width: 100%;
  height: 8em;
  object-fit: cover;
}

.text {
  @mixin text-overflow;
}

.link-wrapper {
  margin-top: auto;
}
</style>
