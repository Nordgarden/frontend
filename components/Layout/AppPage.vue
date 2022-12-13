<template>
  <main :class="$style.main">
    <div :class="$style.content">
      <!-- eslint-disable-next-line -->
      <h1 id="content" tabindex="-1" v-html="title" />
      <slot />
    </div>
    <img
      :src="require('~/assets/images/promo.png')"
      :class="$style.promo"
      loading="lazy"
      width="472"
      height="456"
      alt
    />
  </main>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss" module>
.main {
  --triangle-size: 50vw;

  display: flex;
  position: relative;
  min-height: 100vh;
  padding: 5em var(--gutter) 0;
  flex-direction: column;

  @media (--navigation-position-left) {
    margin-left: var(--width-navigation-left);
    padding-top: var(--gutter);
  }

  @media (--viewport-md) {
    --triangle-size: 25vw;
  }

  &::before,
  &::after {
    position: absolute;
    bottom: 0;
    right: 0;
    content: '';
    z-index: -1;
  }

  &::after {
    border-right: var(--triangle-size) solid transparent;
    border-top: var(--triangle-size) solid var(--color-secondary);
    width: var(--spacing-m);
    height: var(--spacing-m);
  }

  &::before {
    width: var(--triangle-size);
    height: var(--triangle-size);
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 18px,
      #c5c5c5 18px,
      #c5c5c5 20px
    );
  }
}

.content {
  flex: 1 1 auto;
}

.promo {
  display: block;
  margin: var(--spacing-xl) auto 0;
}
</style>
