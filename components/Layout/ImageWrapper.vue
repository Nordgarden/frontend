<script lang="ts" setup>
  import { IFeaturedImage } from "~~/types/IContent";

  defineProps<{
    image?: IFeaturedImage | undefined;
    lazy?: boolean;
  }>();
</script>

<template>
  <div class="wrapper">
    <div class="text"><slot /></div>
    <div class="image-wrapper">
      <img
        v-if="image"
        :src="image.src"
        :srcset="image.srcSet"
        :loading="lazy ? 'lazy' : 'eager'"
        :alt="image.alt"
        class="image"
        sizes=""
      />
      <slot name="image" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
  @import "~/assets/css/media-queries/media-queries.css";

  .wrapper {
    display: grid;
    grid-template-areas: "image" "text";
    @media (--viewport-sm) {
      grid-template-columns: 10em auto;
      grid-template-areas: "image text";
      gap: 1em;
    }
  }

  .image-wrapper {
    grid-area: image;
  }

  .image {
    margin-bottom: 0.5em;
    max-width: 15em;
    width: 100%;
  }

  .text {
    @mixin text-overflow;
  }
</style>
