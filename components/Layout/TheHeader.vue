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
  const content: Ref<HTMLDivElement | null> = ref(null);

  const lockBodyScoll = (isOpen: boolean) => {
    if (!content.value) {
      return;
    }

    if (isOpen) {
      disableBodyScroll(content.value);
    } else {
      enableBodyScroll(content.value);
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
          <div v-show="menuIsOpen" ref="content" class="content">
            <div class="navigation">
              <center-wrapper>
                <main-navigation />
              </center-wrapper>
            </div>
            <div class="player">
              <center-wrapper>
                <div class="footer">
                  <audio-player-controls />
                  <social-links />
                </div>
              </center-wrapper>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </header>
</template>

<style lang="postcss" scoped>
  .content {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    max-height: 100dvh;

    @media (--navigation-position-left) {
      overflow: visible;
      transform: none;
      display: block !important;
      max-height: none;
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
    background: var(--color-white);
    position: fixed;
    inset: 0 0 auto;
    height: 100dvh;
    overflow: hidden;
    z-index: var(--z-index-main-navigation);
    padding-top: 5em;

    @media (--navigation-position-left) {
      padding-top: 0;
      background: transparent;
      overflow: visible;
      display: block !important;
      justify-content: space-between;
      width: var(--width-navigation-left);
      padding: 0;
      height: auto;
      inset: auto;
      position: static;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s 0.2s var(--transition-timing-function);
    @media (--navigation-position-left) {
      transition: none;
    }
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: translateY(calc(var(--spacing-l) * -1));
    opacity: 0;
  }

  .fade2-enter-active,
  .fade2-leave-active {
    transition: transform 0.3s var(--transition-timing-function);
    @media (--navigation-position-left) {
      transition: none;
    }
  }

  .fade2-enter-from,
  .fade2-leave-to {
    transform: translateY(-100vh);
  }

  .footer {
    flex-direction: column;
    display: flex;
    gap: 1em;
  }

  @media (--navigation-position-left) {
    .player,
    .navigation {
      z-index: var(--z-index-audio-player);
      position: fixed;
      background-color: var(--color-white);
      border: 0 solid currentColor;
    }

    .navigation {
      border-bottom-width: 2px;
      inset: 0 0 auto;
    }

    .player {
      border-top-width: 2px;
      inset: auto 0 0;
    }

    .footer {
      padding-block: 0.5em;
      justify-content: space-between;
      flex-direction: row;
    }
  }
</style>
