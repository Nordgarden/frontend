<script setup lang="ts">
const { albums } = useAudio();
const { t } = useI18n();

defineI18nRoute({
  paths: {
    en: "/albums",
  },
});
useHead({
  title: t("albums"),
  meta: [
    {
      name: "description",
      hid: "description",
      content: "The new album KORSVEI is out!",
    },
  ],
});
</script>

<template>
  <app-page :title="$t('albums')" />
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
