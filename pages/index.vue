<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/'
  }
})
const { pageIds } = useAppConfig()

const { page } = await usePage(pageIds.home)
</script>

<template>
  <h1 v-if="page" class="sr-only">
    {{ page.title }}
  </h1>
  <posts-list />
</template>
