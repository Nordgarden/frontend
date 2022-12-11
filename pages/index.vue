<script setup lang="ts">
  const { albums } = useAlbums();
</script>

<template>
  <ul v-if="albums.length" class="albums-list">
    <div v-for="album in albums" :key="album.title" :album="album">
      {{ album }}
    </div>
  </ul>
</template>
