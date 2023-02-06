<script setup lang="ts">
const { albums } = useAudio();

defineI18nRoute({
  paths: {
    en: "/albums",
  },
});

const { pageIds } = useAppConfig();
const { page } = await usePage(pageIds.albums);
</script>

<template>
  <app-page :title="page.title" v-if="page" />
  <ul v-if="albums.length" class="albums">
    <app-album
      v-for="(album, index) in albums"
      :key="album.title"
      :album="album"
      :lazy="index > 4"
    />
  </ul>
</template>

<style lang="postcss" scoped>
.albums {
  @mixin list-reset;
}
</style>
