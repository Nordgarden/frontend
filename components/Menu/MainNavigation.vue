<script lang="ts" setup>
  import { IEvent } from "~~/types/IEvent";
  import { Ref } from "vue";

  const localePath = useLocalePath();

  const { keys } = useEvents();
  const menuIsOpen = useMenu();
  const menu: Ref<HTMLAnchorElement | null> = ref(null);
  const events = useState<IEvent[]>(keys.events);
  const arrowPosition: Ref<string | undefined> = ref(undefined);
  const closeMenu = () => {
    menuIsOpen.value = false;
  };

  const route = useRoute();
  const router = useRouter();
  const localeRoute = useLocaleRoute();
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
    const translateX =
      activeLink.parentElement.offsetLeft +
      activeLink.parentElement.offsetWidth / 2;
    arrowPosition.value = `translateX(${translateX}px)`;
  };

  const isNewsPage = computed(() => {
    const indexPath = localeRoute({ name: "index" });
    const postPath = localeRoute({ name: "post", params: { slug: "a" } });
    const routeName = router.currentRoute.value.name;
    if (!indexPath || !postPath) {
      return false;
    }
    return routeName === indexPath.name || routeName === postPath.name;
  });
</script>

<template>
  <nav aria-labelledby="menu-title">
    <h2
      id="menu-title"
      class="sr-only"
      tabindex="-1"
    >
      {{ $t("mainNavigation") }}
    </h2>
    <ul ref="menu">
      <li>
        <nuxt-link
          id="menu"
          :class="{ 'router-link-exact-active': isNewsPage }"
          :to="localePath({ name: 'index' })"
          @click="closeMenu"
        >
          <span class="title">
            {{ $t("home") }}
          </span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="localePath({ name: 'events' })"
          @click="closeMenu"
        >
          <span class="title">{{ $t("tour") }}</span>
          <app-badge :amount="events.length" />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="localePath({ name: 'albums' })"
          @click="closeMenu"
        >
          <span class="title">{{ $t("albums") }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="localePath({ name: 'videos' })"
          @click="closeMenu"
        >
          <span class="title">{{ $t("videos") }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="localePath({ name: 'biography' })"
          @click="closeMenu"
        >
          <span class="title">{{ $t("biography") }}</span>
        </nuxt-link>
      </li>
    </ul>
    <div
      v-if="arrowPosition"
      :style="{ transform: arrowPosition }"
      class="arrow"
    />
  </nav>
</template>

<style lang="postcss" scoped>
  @import "~/assets/css/media-queries/media-queries.css";

  nav {
    position: relative;
  }

  ul {
    @mixin list-reset;

    border-top: 1px dashed currentColor;
    margin-bottom: 1em;

    @media (--navigation-position-left) {
      margin-bottom: 0;
      padding-block: 0.5em;
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
    border-bottom: 1px dashed currentColor;

    &.router-link-exact-active .title {
      box-shadow: 0 2px 0 0 currentColor;
    }

    &:hover {
      & .title {
        box-shadow: 0 3px 0 0 currentColor;
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
      transition: transform 0.2s var(--transition-timing-function);
      left: calc(var(--spacing-s) / -2);

      &::after {
        position: absolute;
        display: block;
        content: "";
        border-left: var(--spacing-xs) solid transparent;
        border-right: var(--spacing-xs) solid transparent;
        border-top: var(--spacing-xs) solid var(--color-white);
      }

      &::before {
        position: absolute;
        display: block;
        content: "";
        margin-left: -3px;
        border-left: calc(var(--spacing-xs) + 3px) solid transparent;
        border-right: calc(var(--spacing-xs) + 3px) solid transparent;
        border-top: calc(var(--spacing-xs) + 3px) solid var(--color-black);
      }
    }
  }
</style>
