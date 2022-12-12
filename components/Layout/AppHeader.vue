<template>
  <header>
    <skip-links />
    <mobile-navigation @toggleMenu="toggleMenu" />

    <transition
      name="fade2"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <div v-show="showMenu" class="bg">
        <transition name="fade">
          <div v-show="showMenu" ref="bg" class="content">
            <h1>
              <router-link to="/">Nordgarden</router-link>
            </h1>
            <main-navigation />
            <social-links />
            <icon-waves
              class="waves"
              aria-hidden="true"
              width="186"
              height="108"
            />
          </div>
        </transition>
      </div>
    </transition>
  </header>
</template>

<script>
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import SkipLinks from "~/components/Menu/SkipLinks.vue";
import IconWaves from "~/assets/icons/waves.svg";

import MainNavigation from "~/components/Menu/MainNavigation.vue";
import SocialLinks from "~/components/Menu/SocialLinks.vue";
import MobileNavigation from "~/components/Menu/MobileNavigation.vue";

export default {
  components: {
    SkipLinks,
    SocialLinks,
    MainNavigation,
    MobileNavigation,
    IconWaves,
  },
  data() {
    return {
      showMenu: false,
    };
  },

  methods: {
    toggleMenu(status) {
      this.showMenu = status;
    },
    afterEnter() {
      this.lockBodyScoll(true);
    },
    beforeLeave() {
      const bg = this.$refs.bg;
      bg.scrollTop = 0;
    },
    afterLeave() {
      this.lockBodyScoll(false);
    },
    lockBodyScoll(isOpen) {
      const { bg } = this.$refs;
      if (isOpen) {
        disableBodyScroll(bg);
      } else {
        enableBodyScroll(bg);
      }
    },
  },
};
</script>

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

.waves {
  display: none;

  @media (--navigation-position-left) {
    margin-top: auto;
    fill: var(--color-primary);
    display: block;
    align-self: flex-start;
    margin-left: calc(var(--gutter) * -1);
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

.fade-enter,
.fade-leave-to {
  transform: translateY(calc(var(--spacing-l) * -1));
  opacity: 0;
}

.fade2-enter-active,
.fade2-leave-active {
  transition: transform 0.3s;
}

.fade2-enter,
.fade2-leave-to {
  transform: translateY(-100vh);
}
</style>
