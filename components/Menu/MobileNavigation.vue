<script lang="ts" setup>
  const menuIsOpen = useMenu();
  const toggleMenu = () => {
    menuIsOpen.value = !menuIsOpen.value;
  };

  const { keys, play, pause } = useAudio();

  const isPlaying = useState<boolean>(keys.isPlaying);
</script>

<template>
  <div class="wrapper">
    <center-wrapper>
      <div class="buttons">
        <button
          :aria-expanded="menuIsOpen ? 'true' : 'false'"
          class="btn"
          @click="toggleMenu()"
        >
          <app-icon icon="bars" />
          {{ $t("menu") }}
        </button>
        <button v-if="isPlaying" @click="pause">
          <app-icon icon="pause" :title="$t('pause')" />
        </button>
        <button v-else @click="play">
          <app-icon icon="play" :title="$t('play')" />
        </button>
      </div>
    </center-wrapper>
  </div>
</template>

<style lang="postcss" scoped>
  .wrapper {
    position: fixed;
    inset: 0 0 auto;
    background: var(--color-white);
    z-index: var(--z-index-mobile-navigation);
    border-bottom: 2px solid currentColor;

    @media (--navigation-position-left) {
      display: none;
    }
  }

  .buttons {
    padding-block: var(--spacing-s);
    display: flex;
    justify-content: space-between;
    gap: 1em;
  }

  .btn {
    padding: var(--spacing-xs) var(--spacing-s) var(--spacing-xs)
      var(--spacing-xs);
    font-size: var(--font-size-sm);
    display: flex;
    align-items: center;
    gap: var(--spacing-xxs);

    &[aria-expanded="true"] {
      background: var(--color-black);
      border-color: var(--color-black);
      color: var(--color-white);
    }
  }
</style>
