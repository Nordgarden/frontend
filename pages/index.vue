<script setup lang="ts">
  defineI18nRoute({
    paths: {
      en: "/",
    },
  });

  const { page } = usePage(152);
</script>

<template>
  <h1 class="sr-only" v-if="page">{{ page.title }}</h1>
  <posts-list />
</template>
