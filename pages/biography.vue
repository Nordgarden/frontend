<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: "/biography",
  },
});
const { pageIds } = useAppConfig();
const { page } = usePage(pageIds.biography);
</script>

<template>
  <app-page v-if="page" :title="page.title">
    <div class="text">
      <BiographyIntro />
      <div v-html="page.content" />
    </div>
  </app-page>
</template>

<style lang="postcss" scoped>
.text {
  @mixin text-overflow;
}
</style>
