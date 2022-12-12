<template>
  <div class="wrapper">
    <notch-wrapper>
      <div class="buttons">
        <button
          :aria-expanded="menuIsExpanded ? 'true' : 'false'"
          class="btn"
          @click="toggleMenu(!menuIsExpanded)"
        >
          <icon-bars aria-hidden="true" width="24" height="24" />
          {{ $t("menu") }}
        </button>
        <!-- <template v-if="songs.length">
          <button v-if="isPlaying" @click="pauseAudio">
            <icon-pause width="24" height="24" aria-hidden="true" />
            <span class="sr-only">{{ $t("pause") }}</span>
          </button>
          <button v-else @click="playAudio()">
            <icon-play width="24" height="24" aria-hidden="true" />
            <span class="sr-only">{{ $t("play") }}</span>
          </button>
        </template> -->
      </div>
    </notch-wrapper>
  </div>
</template>

<script>
import IconPlay from "~/assets/icons/play.svg";
import IconPause from "~/assets/icons/pause.svg";
import IconBars from "~/assets/icons/bars.svg";
import NotchWrapper from "~/components/Layout/NotchWrapper.vue";

export default {
  components: {
    IconPlay,
    IconPause,
    IconBars,
    NotchWrapper,
  },
  data() {
    return {
      menuIsExpanded: false,
    };
  },
  methods: {
    toggleMenu(status) {
      this.menuIsExpanded = status;
      this.$emit("toggleMenu", status);
    },
  },
};
</script>

<style lang="postcss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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

  &:hover {
    background: transparent;
    color: var(--text-color);
  }

  &[aria-expanded="true"] {
    background: var(--color-primary);
    color: var(--color-white);
  }
}

svg {
  margin-right: var(--spacing-xxs);
}
</style>
