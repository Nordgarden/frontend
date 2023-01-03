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

  const image = computed(() => {
    if (props.post.featuredImage) {
      return props.post.featuredImage.node.src;
    }
    return undefined;
  });
</script>

<template>
  <ClickableListItem @click="goToPost" class="post">
    <image-wrapper :image="image">
      <h2>
        <nuxt-link :to="url"><span v-html="post.title" /></nuxt-link>
      </h2>
      <post-date :date="post.date" class="date" />
      <div class="text" v-html="post.excerpt" />
      <div class="link-wrapper">
        <span class="read-more">
          {{ $t("readMore") }}
          <app-icon icon="chevron-right" :size="16" class="icon" />
        </span>
      </div>
    </image-wrapper>
  </ClickableListItem>
</template>

<style lang="postcss" scoped>
  .post {
    padding-bottom: var(--spacing-m);
    margin-bottom: var(--spacing-m);
    border-bottom: 2px dashed var(--color-white);

    &:hover,
    &:focus-within {
      & .read-more {
        text-decoration-thickness: 3px;
      }
      & :deep(svg) {
        transform: translateX(var(--spacing-xxs));
      }
    }
  }

  a {
    @mixin link-reset;
  }
</style>
