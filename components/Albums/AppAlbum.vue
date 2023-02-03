<script lang="ts" setup>
  import { ComputedRef } from "vue";
  import { IAlbum } from "~/types/IAlbum";
  import { IFeaturedImage } from "~~/types/IContent";
  const props = defineProps<{
    album: IAlbum;
    lazy?: boolean;
  }>();

  const image: ComputedRef<IFeaturedImage> = computed(() => {
    const sizes = [512, 384];
    const srcSets = sizes.map((size) => {
      return `/images/${props.album.image}-${size}.webp ${size}w`;
    });
    return {
      id: props.album.title,
      srcSet: srcSets.join(", "),
      src: `/images/${props.album.image}-512.webp`,
      alt: props.album.title,
      mediaDetails: {
        width: "512",
        height: "512",
      },
    };
  });
</script>

<template>
  <li class="album">
    <h2 class="title">{{ album.title }}</h2>
    <image-wrapper :image="image" :lazy="lazy">
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

    margin-bottom: 1em;
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
    border-top: 1px solid currentColor;
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
