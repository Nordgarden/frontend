<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local'
})
</script>

<template>
  <div class="skip-links">
    <a
      href="#content"
      class="btn"
    >{{ t("navigateToContent") }}</a>
    <a
      href="#menu"
      class="btn"
    >{{ t("navigateToMenu") }}</a>
  </div>
</template>

<style lang="postcss" scoped>
.btn {
  @mixin link-reset;

  color: var(--color-white);
  background: var(--color-black);

  &:not(:focus) {
    @mixin sr-only;
  }

  &:hover {
    background: var(--color-black);
  }

  &:focus,
  &:active {
    position: fixed;
    z-index: var(--z-index-skip-links);
    top: var(--spacing-m);
    left: var(--spacing-m);
  }
}
</style>

<i18n lang="json">
{
  "en": {
    "navigateToContent": "To main content",
    "navigateToMenu": "To main navigation"
  },
  "nl": {
    "navigateToContent": "Naar hoofdinhoud",
    "navigateToMenu": "Naar hoofdnavigatiemenu"
  }
}
</i18n>
