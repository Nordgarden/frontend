<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/videos'
  }
})

const { pageIds } = useAppConfig()
const { page } = await usePage(pageIds.videos)
</script>

<template>
  <app-page v-if="page" :title="page.title" />
  <videos-list />
</template>
