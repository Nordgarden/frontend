<script setup lang="ts">
const { t } = useI18n();

defineI18nRoute({
  paths: {
    en: "/",
  },
});

const { pageIds } = useAppConfig();
const { page } = usePage(pageIds.home);
</script>

<template>
  <h1 class="sr-only" v-if="page">{{ page.title }}</h1>
  <posts-list />
</template>
