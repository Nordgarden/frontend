<script lang="ts" setup>
const links = [
  {
    url: "https://open.spotify.com/artist/2yLSBMXR6j2svRJtsIn2Cz",
    icon: "spotify",
    network: "Spotify",
  },
  {
    url: "https://music.apple.com/nl/artist/nordgarden/165768114",
    icon: "apple",
    network: "Apple Music",
  },
  {
    url: "https://www.youtube.com/channel/UChYwZ-Z9ub3gh0lYcP8Nfag",
    icon: "youtube",
    network: "YouTube",
  },
  {
    url: "https://www.facebook.com/NordgardenOfficial/",
    icon: "facebook",
    network: "FaceBook",
  },
  {
    url: "https://twitter.com/TerjeNordgarden",
    icon: "twitter",
    network: "Twitter",
  },
  {
    url: "https://www.linkedin.com/in/terje-nordgarden-2460364/",
    icon: "linkedin",
    network: "LinkedIn",
  },
];
</script>

<template>
  <nav aria-labelledby="social-links-title">
    <h2 id="social-links-title" class="sr-only">
      {{ $t("socialMediaLinks") }}
    </h2>
    <ul class="list">
      <li v-for="link in links" :key="link.url">
        <a :href="link.url" rel="noopener" target="_blank" class="link">
          <app-icon
            :icon="link.icon"
            :size="32"
            :title="
              $t('viewOn', { title: 'Nordgarden', network: link.network })
            "
          />
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;

  justify-content: space-between;
  display: flex;
  margin-bottom: var(--spacing-m);
  max-width: 20em;
}

.link {
  @mixin link-reset;
}
</style>
