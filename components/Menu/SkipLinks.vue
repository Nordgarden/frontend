<template>
  <div class="skip-links">
    <a href="#content" class="btn">Naar hoofdinhoud</a>
    <a href="#menu" class="btn">Naar hoofdnavigatiemenu</a>
  </div>
</template>

<style lang="postcss" scoped>
.btn {
  @mixin link-reset;

  background: var(--color-secondary);

  &:not(:focus) {
    @mixin sr-only;
  }

  &:hover {
    background: #f0f;
  }

  &:focus,
  &:active {
    position: fixed;
    z-index: 100;
    top: var(--spacing-m);
    left: var(--spacing-m);
  }
}
</style>
