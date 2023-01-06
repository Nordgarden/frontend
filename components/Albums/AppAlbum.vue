<script lang="ts" setup>
  import { IAlbum } from "~/types/IAlbum";
  const props = defineProps<{
    album: IAlbum;
    lazy?: boolean;
  }>();
</script>

<template>
  <li class="album">
    <h2 class="title">{{ album.title }}</h2>
    <image-wrapper :image="album.image" :lazy="lazy">
      <template v-slot:image>
        <app-date :date="album.releaseDate" class="date" />
        <ul class="stores" v-if="album.spotify || album.apple">
          <li v-if="album.spotify">
            <a
              :href="album.spotify"
              rel="noopener"
              target="_blank"
              class="shop-link"
            >
              <app-icon
                icon="spotify"
                :title="
                  $t('viewOn', {
                    title: album.title,
                    network: 'Spotify',
                  })
                "
              />
            </a>
          </li>
          <li v-if="album.apple">
            <a
              :href="album.apple"
              rel="noopener"
              target="_blank"
              class="shop-link"
            >
              <app-icon
                icon="apple"
                :title="
                  $t('viewOn', {
                    title: album.title,
                    network: 'Apple Music',
                  })
                "
              />
            </a>
          </li>
        </ul>
      </template>
      <ul class="songlist">
        <app-song
          v-for="song in album.songlist"
          :key="song.title"
          :song="song"
          class="song"
        />
      </ul>
    </image-wrapper>
  </li>
</template>

<style lang="postcss" scoped>
  .album {
    margin-bottom: 2em;
  }

  .songlist,
  .stores {
    @mixin list-reset;
  }

  .title {
    margin: 0 0 0.25em;
  }

  .date {
    margin-bottom: var(--spacing-xxs);
    display: block;
  }

  .songlist {
    max-width: var(--container-width-sm);
    border-top: 1px solid var(--color-primary);
  }

  .stores {
    gap: var(--spacing-xs);
    display: flex;
  }

  .shop-link {
    @mixin link-reset;

    flex: 0 0 var(--spacing-m);
  }
</style>
