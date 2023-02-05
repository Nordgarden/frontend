<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      src: string;
      width: number | string;
      height: number | string;
      sizes?: string;
      alt?: string;
      srcset: string;
      lazy?: boolean;
    }>(),
    {
      alt: "",
      lazy: false,
    }
  );
</script>

<template>
  <img
    :src="src"
    :sizes="sizes"
    :srcset="srcset"
    :loading="lazy ? 'lazy' : 'eager'"
    :alt="alt"
    :width="width"
    :height="height"
  />
</template>
