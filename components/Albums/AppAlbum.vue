<script lang="ts" setup>
import { IAlbum } from "~/types/IAlbum";
defineProps<{
  album: IAlbum;
}>();
</script>

<template>
  <li class="album">
    <h2 class="title">{{ album.title }}</h2>
    <div>
      <nuxt-img
        :src="album.image"
        format="avif"
        loading="lazy"
        sizes="sm:100vw md:50vw lg:400px"
        alt=""
      />
      <!-- <post-date :date="album.releaseDate" class="date" /> -->
      <ul class="stores">
        <li v-if="album.spotify">
          <a
            :href="album.spotify"
            rel="noopener"
            target="_blank"
            class="shop-link"
          >
            <!-- <icon-spotify aria-hidden="true" width="24" height="24" /> -->
            <span class="sr-only">
              {{ $t("viewOn", { title: album.title, network: "Spotify" }) }}
            </span>
          </a>
        </li>
        <li v-if="album.apple">
          <a
            :href="album.apple"
            rel="noopener"
            target="_blank"
            class="shop-link"
          >
            <!-- <icon-apple aria-hidden="true" width="24" height="24" /> -->
            <span class="sr-only">
              {{ $t("viewOn", { title: album.title, network: "Apple Music" }) }}
            </span>
          </a>
        </li>
      </ul>
    </div>
    <div>
      <ul class="songlist">
        <app-song
          v-for="song in album.songlist"
          :key="song.title"
          :song="song"
          class="song"
        />
      </ul>
    </div>
  </li>
</template>

<style lang="postcss" scoped>
.songlist,
.stores {
  @mixin list-reset;
}

.title {
  margin: 0;
  grid-column: 1 / -1;
}

.album {
  display: grid;
  grid-gap: var(--spacing-m);
  margin-bottom: var(--spacing-l);

  @media (--viewport-sm) {
    grid-template-columns: 10em auto;
  }
}

.date {
  margin-bottom: var(--spacing-xxs);
  display: block;
}

.image {
  display: block;
  max-width: 10em;
  margin-bottom: var(--spacing-xxs);
  width: 100%;

  @media (--viewport-sm) {
    max-width: none;
  }
}

.songlist {
  max-width: var(--container-width-sm);
  border-top: 1px solid #ccc;
}

.stores {
  display: flex;
}

.shop-link {
  @mixin link-reset;

  flex: 0 0 var(--spacing-m);
  margin-right: var(--spacing-xs);
}
</style>
