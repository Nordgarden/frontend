<script lang="ts" setup>
defineProps<{
  title: string;
}>()
</script>

<template>
  <div>
    <article>
      <h1 tabindex="-1" v-html="title" />
      <slot />
    </article>
  </div>
</template>
