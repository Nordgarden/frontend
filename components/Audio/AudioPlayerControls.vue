<script setup lang="ts">
  import { Ref } from "vue";

  const {
    playableSongs,
    isPlaying,
    play,
    pause,
    next,
    setCurrentTime,
    currentSong,
    progress,
  } = useAudio();

  const progressBar: Ref<HTMLDivElement | null> = ref(null);

  const scrub = (event: MouseEvent) => {
    if (!progressBar.value) {
      return;
    }
    const offsetX = event.offsetX / progressBar.value.offsetWidth;
    setCurrentTime(offsetX);
  };
</script>

<template>
  <button v-if="isPlaying" :disabled="!playableSongs.length" @click="pause">
    <icon-pause width="24" height="24" aria-hidden="true" />
    <span class="sr-only">{{ $t("pause") }}</span>
  </button>
  <button v-else :disabled="!playableSongs.length" @click="play">
    <icon-play width="24" height="24" aria-hidden="true" />
    <span class="sr-only">{{ $t("play") }}</span>
  </button>
  <button :disabled="playableSongs.length < 1" @click="next">
    <icon-forwards width="24" height="24" aria-hidden="true" />
    <span class="sr-only">{{ $t("next") }}</span>
  </button>
  <div
    v-show="playableSongs.length"
    ref="progressBar"
    class="progress"
    @click="scrub"
  >
    <div :style="{ width: progress }" class="bar"></div>
    <div v-if="currentSong" class="title">{{ currentSong.title }}</div>
  </div>
</template>

<style lang="postcss" scoped>
  .player {
    margin-bottom: var(--spacing-l);
    display: flex;
  }

  audio {
    width: 100%;
  }

  button {
    text-align: center;
    margin-right: var(--spacing-m);
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
    left: 0;
    top: 0;
    bottom: 0;
    background: var(--color-primary);
  }
</style>
