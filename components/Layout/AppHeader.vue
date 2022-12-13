<script lang="ts" setup>
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { Ref } from "vue";

const menuIsOpen = useMenu();
const afterLeave = () => {
  lockBodyScoll(false);
};
const afterEnter = () => {
  lockBodyScoll(true);
};
const bg: Ref<HTMLDivElement | null> = ref(null);

const lockBodyScoll = (isOpen: boolean) => {
  if (!bg.value) {
    return;
  }

  if (isOpen) {
    disableBodyScroll(bg.value);
  } else {
    enableBodyScroll(bg.value);
  }
};
</script>

<template>
  <header>
    <mobile-navigation />

    <transition
      name="fade2"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div v-show="menuIsOpen" class="bg">
        <transition name="fade">
          <div v-show="menuIsOpen" ref="bg" class="content">
            <h1>
              <router-link to="/">Nordgarden</router-link>
            </h1>
            <main-navigation />
            <audio-player-controls />
            <social-links />
          </div>
        </transition>
      </div>
    </transition>
  </header>
</template>

<style lang="postcss" scoped>
.content {
  padding: 5em var(--gutter) var(--gutter);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  max-height: 100vh;

  @media (--navigation-position-left) {
    padding: var(--gutter);
    overflow: visible;
    transform: translateY(0);
    display: flex !important;
    flex-direction: column;
    max-height: none;
    height: 100vh;
    position: relative;
  }
}

a {
  @mixin link-reset;
}

h1 {
  color: currentColor;

  & a {
    text-decoration: none;
  }
}

.bg {
  background: var(--color-secondary);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  overflow: hidden;
  z-index: var(--main-navigation);
  padding: var(--notch);

  @media (--navigation-position-left) {
    background: transparent;
    border-right: 2px solid #fff;
    overflow: visible;
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    width: var(--width-navigation-left);
    padding: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(calc(var(--spacing-l) * -1));
  opacity: 0;
}

.fade2-enter-active,
.fade2-leave-active {
  transition: transform 0.3s;
}

.fade2-enter-from,
.fade2-leave-to {
  transform: translateY(-100vh);
}
</style>
