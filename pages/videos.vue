<script setup lang="ts">
const { t } = useI18n();

defineI18nRoute({
  paths: {
    en: "/videos",
  },
});

useHead({
  title: t("videos"),
  meta: [
    {
      name: "description",
      hid: "Tour dates",
      content: "New music video for TANGO!",
    },
  ],
});
</script>

<template>
  <app-page :title="$t('videos')" />
  <videos-list />
</template>
