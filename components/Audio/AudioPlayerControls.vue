<script setup lang="ts">
  import { Ref } from "vue";
  import { IPlayableSong } from "~~/types/ISong";

  const { albums, playableSongs, play, pause, next, setCurrentTime, keys } =
    useAudio();

  const progressBar: Ref<HTMLDivElement | null> = ref(null);

  const isPlaying = useState<boolean>(keys.isPlaying);
  const currentSong = useState<IPlayableSong>(keys.currentSong);
  const progress = useState<string | null>(keys.progress);

  const scrub = (event: MouseEvent) => {
    if (!progressBar.value) {
      return;
    }
    const offsetX = event.offsetX / progressBar.value.offsetWidth;
    setCurrentTime(offsetX);
  };
  const { mediaSizes } = useAppConfig();
</script>

<template>
  <div class="wrapper" v-if="playableSongs">
    <button v-if="isPlaying" @click="pause">
      <app-icon icon="pause" :title="$t('pause')" />
    </button>
    <button v-else @click="play">
      <app-icon icon="play" :title="$t('play')" />
    </button>
    <button v-if="playableSongs.length > 1" @click="next">
      <app-icon icon="forwards" :title="$t('next')" />
    </button>
    <div ref="progressBar" class="progress" @click="scrub">
      <div :style="{ width: progress }" class="bar"></div>
      <div v-if="currentSong" class="title">{{ currentSong.title }}</div>
    </div>
  </div>
  <div class="media-images">
    <div v-for="album in albums" :key="album.title">
      <nuxt-img
        :src="album.image"
        alt=""
        :width="size"
        :height="size"
        v-for="size in mediaSizes"
        :key="size"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
  .wrapper {
    margin-bottom: var(--spacing-l);
    gap: var(--spacing-m);
    display: flex;
  }

  audio {
    width: 100%;
  }

  button {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .progress {
    position: relative;
    flex: 1 0 auto;
    cursor: pointer;
  }

  .title {
    max-width: 12rem;
    padding: 0 var(--spacing-xxs);
    font-size: var(--font-size-sm);
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    text-overflow: ellipsis;
  }

  .bar {
    transition: width linear 0.1s;
    position: absolute;
    inset: 0 auto 0 0;
    background: var(--color-primary);
  }

  .media-images {
    display: none;
  }
</style>
