<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<template>
  <div>
    <!-- eslint-disable-next-line -->
    <article>
      <h1 tabindex="-1" v-html="title" />
      <slot />
    </article>
  </div>
</template>
