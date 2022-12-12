<script lang="ts" setup>
withDefaults(
  defineProps<{
    icon: string;
    size?: number;
    title?: string;
  }>(),
  {
    size: 24,
  }
);
</script>

<template>
  <nuxt-icon :name="icon" :width="size" :height="size" aria-hidden="true" />
  <span class="sr-only" v-if="title">{{ title }}</span>
</template>
