<script setup lang="ts">
  const { albums } = useAudio();
</script>

<template>
  <ul v-if="albums.length" class="albums-list">
    <app-album v-for="album in albums" :key="album.title" :album="album" />
  </ul>
</template>
