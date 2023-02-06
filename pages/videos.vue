<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: "/videos",
  },
});

const { pageIds } = useAppConfig();
const { page } = await usePage(pageIds.videos);
</script>

<template>
  <app-page :title="page.title" v-if="page" />
  <videos-list />
</template>
