<script setup lang="ts">
const localePath = useLocalePath();
const { fetchEvents } = useEvents();

onMounted(() => {
  fetchEvents();
});
</script>

<template>
  <div>
    <skip-links />
    <audio-player />
    <audio-player-controls />
    <nuxt-link :to="localePath({ name: 'index' })">Home</nuxt-link>
    <nuxt-link :to="localePath({ name: 'albums' })">Albums</nuxt-link>
    <nuxt-link :to="localePath({ name: 'events' })">Events</nuxt-link>
    <nuxt-link :to="localePath({ name: 'biography' })">biography</nuxt-link>
    <notch-wrapper>
      <main>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </main>
    </notch-wrapper>
  </div>
</template>
