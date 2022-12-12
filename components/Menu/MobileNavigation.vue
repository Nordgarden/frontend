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
    <notch-wrapper>
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
    </notch-wrapper>
  </div>
</template>

<style lang="postcss" scoped>
.wrapper {
  position: fixed;
  inset: 0 0 auto;
  background: var(--color-secondary);
  z-index: var(--mobile-navigation);
  border-bottom: 2px solid var(--color-white);

  @media (--navigation-position-left) {
    display: none;
  }
}

.buttons {
  padding: var(--spacing-s) var(--gutter);
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: var(--spacing-xs) var(--spacing-s) var(--spacing-xs)
    var(--spacing-xs);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs);

  &:hover {
    background: transparent;
    color: var(--text-color);
  }

  &[aria-expanded="true"] {
    background: var(--color-primary);
    color: var(--color-white);
  }
}
</style>
