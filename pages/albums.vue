<script setup lang="ts">
const { albums } = useAudio();
const { t } = useI18n();

defineI18nRoute({
  paths: {
    en: "/albums",
  },
});
</script>

<template>
  <app-page :title="t('albums')">
    <ul v-if="albums.length" class="albums">
      <app-album v-for="album in albums" :key="album.title" :album="album" />
    </ul>
  </app-page>
</template>

<style lang="postcss" scoped>
.albums {
  @mixin list-reset;
}
</style>
