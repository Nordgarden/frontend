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
    <div class="text">
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
    </div>
    <div class="image-wrapper">
      <featured-image
        v-if="post.featuredImage"
        :image="post.featuredImage.node"
        class="image"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 500px"
      />
    </div>
  </ClickableListItem>
</template>

<style lang="postcss" scoped>
  .post {
    display: grid;
    grid-template-columns: 10em auto;
    grid-template-areas: "image text";
    gap: 1em;
    flex-direction: column;
    padding-bottom: var(--spacing-m);
    margin-bottom: var(--spacing-m);
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

  .image-wrapper {
    grid-area: image;
  }

  .text {
    @mixin text-overflow;
  }

  .link-wrapper {
    margin-top: auto;
  }
</style>
