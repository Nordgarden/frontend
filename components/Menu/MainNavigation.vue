<script lang="ts" setup>
  import { IEvent } from "~~/types/IEvent";
  import { Ref } from "vue";

  const localePath = useLocalePath();

  const { keys } = useEvents();
  const menuIsOpen = useMenu();
  const menu: Ref<HTMLAnchorElement | null> = ref(null);
  const events = useState<IEvent[]>(keys.events);
  const arrowPosition: Ref<string | undefined> = ref(undefined);
  const changePage = () => {
    menuIsOpen.value = false;
  };

  const route = useRoute();
  watch(route, () => {
    nextTick(() => {
      setArrowPosition();
    });
  });

  onMounted(() => {
    setArrowPosition();
  });
  const setArrowPosition = () => {
    if (!menu.value) {
      return;
    }
    const activeLink = menu.value.querySelector(".router-link-exact-active");
    if (!activeLink?.parentElement) {
      return;
    }
    arrowPosition.value = `translateY(${activeLink.parentElement.offsetTop}px)`;
  };
</script>

<template>
  <nav aria-labelledby="menu-title">
    <h2 id="menu-title" class="sr-only" tabindex="-1">
      {{ $t("mainNavigation") }}
    </h2>
    <ul ref="menu">
      <li>
        <nuxt-link
          id="menu"
          :to="localePath({ name: 'index' })"
          @click.native="changePage"
        >
          <span class="title">
            {{ $t("home") }}
          </span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="localePath({ name: 'events' })"
          @click.native="changePage"
        >
          <span class="title">{{ $t("tour") }}</span>
          <app-badge :amount="events.length" />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="localePath({ name: 'albums' })"
          @click.native="changePage"
        >
          <span class="title">{{ $t("albums") }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="localePath({ name: 'videos' })"
          @click.native="changePage"
        >
          <span class="title">{{ $t("videos") }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="localePath({ name: 'biography' })"
          @click.native="changePage"
        >
          <span class="title">{{ $t("biography") }}</span>
        </nuxt-link>
      </li>
    </ul>
    <!-- <div
      :style="{ transform: arrowPosition }"
      class="arrow"
      v-if="arrowPosition"
    /> -->
  </nav>
</template>

<style lang="postcss" scoped>
  nav {
    position: relative;
  }

  ul {
    @mixin list-reset;

    border-top: 1px dashed var(--color-gray);
    padding-block: 0.5em;
    margin-bottom: 0;

    @media (--navigation-position-left) {
      border-top: 0;
      display: flex;
      gap: var(--gutter);
      justify-content: center;
    }
  }

  .title {
    transition: box-shadow 0.1s var(--transition-timing-function);

    &.link-active {
      box-shadow: 0 2px 0 0 var(--color-primary);
    }
  }

  a {
    @mixin link-reset;

    align-items: center;
    display: flex;
    position: relative;
    text-decoration: none;
    font-size: var(--font-size-lg);
    line-height: 1.1;
    padding: 0.45em 0;
    border-bottom: 1px dashed var(--color-gray);

    &.router-link-exact-active .title {
      box-shadow: 0 2px 0 0 var(--color-primary);
    }

    &:focus {
      outline: none;
    }

    &:focus,
    &:hover {
      & .title {
        box-shadow: 0 3px 0 0 var(--color-primary);
      }
    }

    @media (--navigation-position-left) {
      border-bottom: 0;
      padding: var(--spacing-xxs) 0;
    }
  }

  .arrow {
    @media (--navigation-position-left) {
      display: block;
      position: absolute;
      top: 0;
      right: calc(var(--spacing-l) * -1);
      transition: transform 0.2s var(--transition-timing-function);

      &::after {
        position: absolute;
        display: block;
        content: "";
        border-top: var(--spacing-s) solid transparent;
        border-bottom: var(--spacing-s) solid transparent;
        border-left: var(--spacing-m) solid var(--color-secondary);
      }

      &::before {
        position: absolute;
        display: block;
        content: "";
        margin-top: -3px;
        border-top: calc(var(--spacing-s) + 3px) solid transparent;
        border-bottom: calc(var(--spacing-s) + 3px) solid transparent;
        border-left: calc(var(--spacing-m) + 6px) solid #fff;
      }
    }
  }
</style>
