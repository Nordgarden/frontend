<script lang="ts" setup>
  import { IFeaturedImage } from "~~/types/IContent";

  const props = withDefaults(
    defineProps<{
      image?: string | IFeaturedImage;
      remote?: boolean;
      lazy?: boolean;
      alt?: string;
    }>(),
    {
      remote: true,
      lazy: false,
    }
  );

  const component = computed(() => {
    if (props.remote) {
      return resolveComponent("remote-image");
    }
    return resolveComponent("static-image");
  });
</script>

<template>
  <div class="wrapper">
    <div class="text"><slot /></div>
    <div class="image-wrapper">
      <component
        :alt="alt"
        :is="component"
        :image="image"
        :lazy="props.lazy"
        class="image"
        sizes="(max-width: 320px) 270px, 200px"
        v-if="image"
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

  .image :deep(img) {
    margin-bottom: 0.5em;
    max-width: 15em;
    width: 100%;
    display: block;
  }

  .text {
    @mixin text-overflow;
  }
</style>
