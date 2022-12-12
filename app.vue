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
    <mobile-navigation />
    <MainNavigation />
    <SocialLinks />
    <notch-wrapper>
      <main>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </main>
    </notch-wrapper>
  </div>
</template>
