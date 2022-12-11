<script setup lang="ts">
  const { albums } = useAlbums();
</script>

<template>
  <ul v-if="albums.length" class="albums-list">
    <div v-for="album in albums" :key="album.title" :album="album">
      <nuxt-img
        :src="album.image"
        format="avif"
        sizes="sm:100vw md:50vw lg:400px"
        alt=""
      />
      {{ album }}
    </div>
  </ul>
</template>
