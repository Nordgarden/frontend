<script lang="ts" setup>
  import { IFeaturedImage } from "~~/types/IContent";

  defineProps<{
    image: IFeaturedImage;
    lazy: boolean;
    sizes?: string;
  }>();
</script>

<template>
  <app-image
    :src="image.src"
    :srcset="image.srcSet"
    :lazy="lazy"
    :alt="image.alt"
    :sizes="sizes"
    :width="image.mediaDetails.width"
    :height="image.mediaDetails.height"
  />
</template>
