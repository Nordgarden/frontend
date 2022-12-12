<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: "/tour",
  },
});
</script>

<template>
  <app-page :title="$t('tour')">
    <event-list />
  </app-page>
</template>
