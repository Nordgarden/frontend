<script setup lang="ts">
const { t } = useI18n();

defineI18nRoute({
  paths: {
    en: "/tour",
  },
});

useHead({
  title: t("tour"),
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
  <app-page :title="$t('tour')" />
  <event-list />
</template>
