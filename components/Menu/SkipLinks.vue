<template>
  <div class="skip-links">
    <a href="#content" class="btn">{{ $t("skiplinks.content") }}</a>
    <a href="#menu" class="btn">{{ $t("skiplinks.menu") }}</a>
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
