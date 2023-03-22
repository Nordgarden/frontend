<script setup lang="ts">
const { fetchEvents } = useEvents()

onMounted(() => {
  fetchEvents()
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="var(--color-primary)" />
    <NuxtPage />
  </NuxtLayout>
</template>
