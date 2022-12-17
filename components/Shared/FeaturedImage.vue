<template>
  <img
    alt=""
    :loading="lazy ? 'lazy' : 'eager'"
    :srcset="image.srcSet"
    :sizes="sizes"
    :src="image.src"
    :width="image.mediaDetails.width"
    :height="image.mediaDetails.height"
  />
</template>

<script lang="ts" setup>
  import { IFeaturedImage } from "~~/types/IContent";

  defineProps<{
    image: IFeaturedImage;
    sizes: string;
    lazy?: boolean;
  }>();
</script>

<style lang="postcss" scoped>
  .image {
    display: block;
    max-width: 100%;
  }
</style>
