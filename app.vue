<script setup lang="ts">
const { fetchEvents } = useEvents()

onMounted(() => {
  fetchEvents()
})
</script>

<template>
  <nuxt-layout>
    <nuxt-loading-indicator color="var(--color-primary)" />
    <nuxt-page />
  </nuxt-layout>
</template>
