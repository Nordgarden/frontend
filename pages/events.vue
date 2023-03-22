<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/tour'
  }
})

const { pageIds } = useAppConfig()
const { page } = await usePage(pageIds.events)
</script>

<template>
  <app-page v-if="page" :title="page.title" />
  <event-list />
</template>
