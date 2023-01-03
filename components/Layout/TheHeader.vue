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

    <!-- <transition
      name="fade2"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div v-show="menuIsOpen" class="bag">
        <transition name="fade">
          <div v-show="menuIsOpen" ref="bg" class="content"> -->
    <!-- <h1>
              <nuxt-link to="/">Nordgarden</nuxt-link>
            </h1> -->
    <div class="navigation">
      <center-wrapper>
        <main-navigation />
      </center-wrapper>
    </div>
    <div class="player">
      <center-wrapper>
        <audio-player-controls />
      </center-wrapper>
    </div>
    <!-- <social-links />  -->
    <!-- </div> -->
    <!-- </transition>
      </div>
    </transition> -->
  </header>
</template>

<style lang="postcss" scoped>
  .content {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    max-height: 100vh;

    @media (--navigation-position-left) {
      overflow: visible;
      transform: translateY(0);
      display: block !important;
      flex-direction: row;
      max-height: none;
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
      border-bottom: 2px solid #fff;
      overflow: visible;
      display: flex !important;
      flex-direction: column;
      justify-content: space-between;
      width: var(--width-navigation-left);
      padding: 0;
      height: auto;
      position: relative;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s 0.2s var(--transition-timing-function);
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: translateY(calc(var(--spacing-l) * -1));
    opacity: 0;
  }

  .fade2-enter-active,
  .fade2-leave-active {
    transition: transform 0.3s var(--transition-timing-function);
  }

  .fade2-enter-from,
  .fade2-leave-to {
    transform: translateY(-100vh);
  }

  @media (--navigation-position-left) {
    .navigation {
      background: #f0f;
      position: fixed;
      inset: 0 0 auto;
    }

    .player {
      z-index: var(--audio-player);
      background: #f0f;
      position: fixed;
      inset: auto 0 0;
    }
  }
</style>
