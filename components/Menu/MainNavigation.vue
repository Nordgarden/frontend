<template>
  <nav aria-labelledby="menu-title">
    <h2 id="menu-title" class="sr-only" tabindex="-1">
      {{ $t("mainNavigation") }}
    </h2>
    <ul ref="menu">
      <li>
        <nuxt-link id="menu" to="/" @click.native="changePage">
          <span class="title">
            {{ $t("home") }}
          </span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/tour" @click.native="changePage">
          <span class="title">{{ $t("tour") }}</span>
          <app-badge :amount="list.length" />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/albums" @click.native="changePage">
          <span class="title">{{ $t("albums") }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/videos" @click.native="changePage">
          <span class="title">{{ $t("videos") }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/biography" @click.native="changePage">
          <span class="title">{{ $t("biography") }}</span>
        </nuxt-link>
      </li>
    </ul>
    <div
      :style="{ '-webkit-transform': arrowPosition, transform: arrowPosition }"
      class="arrow"
    />
  </nav>
</template>

<script>
import AppBadge from "~/components/Shared/AppBadge.vue";

export default {
  components: {
    AppBadge,
  },
  data() {
    return {
      arrowPosition: 0,
      list: [],
    };
  },
  computed: {
    step() {
      return this.$store.state.step;
    },
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.setArrowPosition();
      });
    },
  },
  mounted() {
    this.setArrowPosition();
    setTimeout(() => {
      this.mounted = true;
    }, 0);

    this.setTours();
  },
  methods: {
    setArrowPosition() {
      const { menu } = this.$refs;
      const activeLink = menu.querySelector(".nuxt-link-exact-active");
      if (activeLink) {
        const { parentElement } = activeLink;
        this.arrowPosition = `translateY(${parentElement.offsetTop}px)`;
        this.arrowWidth = `${activeLink.offsetWidth}px`;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
nav {
  position: relative;
}

ul {
  @mixin list-reset;

  margin-bottom: var(--spacing-m);
  border-top: 1px dashed var(--color-gray);

  @media (--navigation-position-left) {
    border-top: 0;
  }
}

.title {
  transition: box-shadow 0.1s ease-out;

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

  &.nuxt-link-exact-active .title {
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
    transition: transform 0.2s ease-out;

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
