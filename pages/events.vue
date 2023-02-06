<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: "/tour",
  },
});

const { pageIds } = useAppConfig();
const { page } = await usePage(pageIds.events);
</script>

<template>
  <app-page :title="page.title" v-if="page" />
  <event-list />
</template>
