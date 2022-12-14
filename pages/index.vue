<script setup lang="ts">
const { t } = useI18n();

defineI18nRoute({
  paths: {
    en: "/",
  },
});

useHead({
  title: t("home"),
  meta: [
    {
      name: "description",
      content:
        "'Nordgarden is a Norwegian artist deriving from the American old school of classic songwriting.'",
    },
  ],
});
</script>

<template>
  <h1 class="sr-only">{{ $t("home") }}</h1>
  <posts-list />
</template>
