<script lang="ts" setup>
  withDefaults(
    defineProps<{
      image?: string;
      alt?: string;
      lazy?: boolean;
    }>(),

    {
      alt: "",
    }
  );
</script>

<template>
  <div class="wrapper">
    <div class="text"><slot /></div>
    <div class="image-wrapper">
      <img
        v-if="image"
        :src="image"
        :loading="lazy ? 'lazy' : 'eager'"
        sizes="xs:200px sm:400px"
        :alt="alt"
      />
      <slot name="image" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
  .wrapper {
    display: grid;
    grid-template-columns: 10em auto;
    grid-template-areas: "image text";
    gap: 1em;
  }

  .image-wrapper {
    grid-area: image;
  }
</style>
