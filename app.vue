<script setup lang="ts">
  const { fetchEvents } = useEvents();

  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - Nordgarden` : "Nordgarden";
    },
  });

  onMounted(() => {
    fetchEvents();
  });
</script>

<template>
  <div>
    <skip-links />
    <audio-player />
    <the-header />
    <center-wrapper>
      <main class="main">
        <NuxtLayout>
          <NuxtLoadingIndicator color="var(--color-black)" />
          <NuxtPage />
        </NuxtLayout>
      </main>
    </center-wrapper>
    <client-only>
      <pwa-update />
    </client-only>
  </div>
</template>

<style lang="postcss" scoped>
  .main {
    margin-block: 5em 8em;
  }
</style>
