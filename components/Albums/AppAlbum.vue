<template>
  <li :class="$style.album">
    <h2 :class="$style.title">{{ album.title }}</h2>
    <div>
      <album-image
        :width="200"
        :height="200"
        :image="album.image"
        :class="$style.image"
      />
      <post-date :date="album.releaseDate" :class="$style.date" />
      <ul :class="$style.shops">
        <li v-if="album.spotify">
          <a
            :href="album.spotify"
            rel="noopener"
            target="_blank"
            :class="$style['shop-link']"
          >
            <icon-spotify aria-hidden="true" width="24" height="24" />
            <span class="sr-only">
              {{ $t('viewOn', { title: album.title, network: 'Spotify' }) }}
            </span>
          </a>
        </li>
        <li v-if="album.apple">
          <a
            :href="album.apple"
            rel="noopener"
            target="_blank"
            :class="$style['shop-link']"
          >
            <icon-apple aria-hidden="true" width="24" height="24" />
            <span class="sr-only">
              {{ $t('viewOn', { title: album.title, network: 'Apple Music' }) }}
            </span>
          </a>
        </li>
      </ul>
    </div>
    <div>
      <ul :class="$style.songlist">
        <app-song
          v-for="song in album.songlist"
          :key="song.title"
          :song="song"
          :class="$style.song"
        />
      </ul>
    </div>
  </li>
</template>

<script>
import AppSong from '~/components/Albums/AppSong.vue'
import AlbumImage from '~/components/Albums/AlbumImage.vue'
import IconApple from '~/assets/icons/apple.svg'
import IconSpotify from '~/assets/icons/spotify.svg'
import PostDate from '~/components/Shared/AppDate.vue'

export default {
  components: {
    IconSpotify,
    IconApple,
    AppSong,
    PostDate,
    AlbumImage,
  },
  props: {
    album: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="postcss" module>
.songlist,
.shops {
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

.shops {
  display: flex;
}

.shop-link {
  @mixin link-reset;

  flex: 0 0 var(--spacing-m);
  margin-right: var(--spacing-xs);
}
</style>
