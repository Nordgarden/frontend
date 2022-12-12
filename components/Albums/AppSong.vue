<script lang="ts" setup>
import { ISong } from "~~/types/ISong";

const { selectSong, pause, currentSong, isPlaying } = useAudio();

const props = defineProps<{
  song: ISong;
}>();

const isPlayingCurrentSong = computed(() => {
  return currentSong.value?.file === props.song.file && isPlaying.value;
});
</script>

<template>
  <li class="song">
    <div class="button-wrapper">
      <template v-if="song.file">
        <button
          v-if="!isPlayingCurrentSong"
          class="btn-play"
          @click="selectSong(song)"
        >
          <icon-play width="20" height="20" aria-hidden="true" />
          <span class="sr-only">{{ $t("play") }}</span>
        </button>
        <button v-else class="btn-pause" @click="pause">
          <icon-pause width="20" height="20" aria-hidden="true" />
          <span class="sr-only">{{ $t("pause") }}</span>
        </button>
      </template>
    </div>
    <span class="title">{{ song.title }}</span>
  </li>
</template>

<style lang="postcss" scoped>
.song {
  padding: 0.1em 0;
  border-bottom: 1px solid #ccc;
  display: flex;
}

.title {
  flex: 1 1 auto;
}

.button-wrapper {
  width: 1.5em;
}

.btn-pause,
.btn-play {
  height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
