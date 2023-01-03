<template>
  <div class="notch-wrapper">
    <div class="center-wrapper">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss">
  .notch-wrapper {
    padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
  }
  .center-wrapper {
    /* stylelint-disable-next-line length-zero-no-unit */
    --zero: 0px;

    padding-inline: var(--gutter);
    margin-inline: max(var(--zero), ((100% - var(--container-width-lg)) / 2));
  }
</style>
