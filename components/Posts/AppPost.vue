<template>
  <ClickableListItem :to="post.slug">
    <!-- eslint-disable-next-line -->
    <h2><router-link :to="post.slug" v-html="post.title" /></h2>
    <post-date :date="post.date" />
    <!-- eslint-disable-next-line -->
    <div class="text" v-html="post.excerpt" />
    <div class="link-wrapper">
      <span class="read-more">
        {{ $t("readMore") }}
        <nuxt-icon
          name="chevron-right"
          aria-hidden="true"
          width="16"
          height="16"
        />
      </span>
    </div>
    <image-archive
      v-if="post.featuredImage"
      :image="post.featuredImage.node"
      class="image"
    />
  </ClickableListItem>
</template>

<script>
  export default {
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        down: null,
      };
    },
  };
</script>

<style lang="postcss" scoped>
  li {
    display: flex;
    flex-direction: column;
    padding-bottom: var(--spacing-m);
    border-bottom: 2px dashed var(--color-white);
    cursor: pointer;

    &:hover .read-more,
    &:focus-within .read-more {
      box-shadow: 0 3px 0 0 var(--color-primary);

      & svg {
        margin-left: var(--spacing-xxs);
      }
    }
  }

  a {
    @mixin link-reset;
  }

  .image {
    width: 100%;
    height: 8em;
    object-fit: cover;
    order: -2;
    margin-bottom: var(--spacing-xs);
  }

  time {
    order: -1;
    font-size: var(--font-size-sm);
  }

  .text {
    @mixin text-overflow;
  }

  .link-wrapper {
    margin-top: auto;
  }
</style>
