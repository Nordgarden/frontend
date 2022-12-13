<script setup lang="ts">
const { albums } = useAudio();

defineI18nRoute({
  paths: {
    en: "/albums",
  },
});
</script>

<template>
  <app-page :title="$t('albums')">
    <ul v-if="albums.length" class="albums">
      <app-album
        v-for="(album, index) in albums"
        :key="album.title"
        :album="album"
        :lazy="index > 4"
      />
    </ul>
  </app-page>
</template>

<style lang="postcss" scoped>
.albums {
  @mixin list-reset;
}
</style>
