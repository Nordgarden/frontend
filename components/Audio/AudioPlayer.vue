<script setup lang="ts">
const {
  currentSong,
  isPlaying,
  player,
  progress,
  pause,
  play,
  next,
  previous,
  setMetaData,
} = useAudio();
const preload = ref("none");

const userHasFastConnection = () => {
  if (!process.client) return false;
  const connection = window.navigator.connection;
  if (!connection) return false;

  const slowConnections = ["slow-2g", "2g", "3g"];
  return !slowConnections.includes(connection.effectiveType);
};

const setPreloadOnFastConnection = () => {
  if (userHasFastConnection()) {
    preload.value = "auto";
  } else {
    preload.value = "none";
  }
};

const setMediaSessionEventListeners = () => {
  if (!process.client) return;
  if (!("mediaSession" in window.navigator)) return;
  navigator.mediaSession.setActionHandler("pause", () => {
    pause();
  });
  navigator.mediaSession.setActionHandler("play", () => {
    play();
  });
  navigator.mediaSession.setActionHandler("seekbackward", (details) => {
    if (!player.value) {
      return;
    }
    player.value.currentTime =
      player.value.currentTime - (details.seekOffset || 10);
  });
  navigator.mediaSession.setActionHandler("seekforward", (details) => {
    if (!player.value) {
      return;
    }
    player.value.currentTime =
      player.value.currentTime + (details.seekOffset || 10);
  });
  navigator.mediaSession.setActionHandler("previoustrack", () => {
    previous();
  });

  navigator.mediaSession.setActionHandler("nexttrack", () => {
    next();
  });
};

onMounted(() => {
  setPreloadOnFastConnection();
  setMediaSessionEventListeners();
  setMetaData();
});

const setPlayState = (state: boolean) => {
  isPlaying.value = state;
};

const timeupdate = () => {
  if (!player.value) {
    return;
  }
  progress.value = `${
    (player.value.currentTime / player.value.duration) * 100
  }%`;
};
</script>

<template>
  <audio
    ref="player"
    v-if="currentSong"
    :src="currentSong.file"
    :preload="preload"
    type="audio/mp3"
    @timeupdate="timeupdate"
    @ended="next"
    @play="setPlayState(true)"
    @pause="setPlayState(false)"
  />
</template>
