<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: "/videos",
  },
});
</script>

<template>
  <app-page :title="$t('videos')"> </app-page>
</template>
