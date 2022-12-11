<script setup lang="ts">
  const { playableSongs, isPlaying } = useAlbums();
</script>

<template>
  <div class="player">
    <audio
      ref="audio"
      :src="currentSongFile"
      :preload="preload"
      type="audio/mp3"
      @timeupdate="timeupdate"
      @ended="next"
      @play="setPlayState(true)"
      @pause="setPlayState(false)"
    />
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
