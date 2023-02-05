<script setup lang="ts">
  defineI18nRoute({
    paths: {
      en: "/",
    },
  });
  const { pageIds } = useAppConfig();

  const { page } = await usePage(pageIds.home);
</script>

<template>
  <h1 class="sr-only" v-if="page">{{ page.title }}</h1>
  <posts-list />
</template>
