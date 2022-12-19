<script lang="ts" setup>
import videos from "~/data/videos";

const { pause } = useAudio();

const videoId = ref(videos[0].videoId);
const autoPlay = ref(0);

const isCurrentVideo = (id: string) => {
  return id === videoId.value;
};

const playVideo = (id: string) => {
  pause();
  videoId.value = id;
  autoPlay.value = 1;
};
</script>

<template>
  <div class="videos">
    <div class="video-container">
      <iframe
        autoplay="1"
        class="player"
        :src="`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoPlay}&rel=0&modestbranding=1`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>

    <ul class="list">
      <clickable-list-item
        v-for="video in videos"
        :key="video.videoId"
        :class="{ 'is-active': isCurrentVideo(video.videoId) }"
        class="list-item"
        @click="playVideo(video.videoId)"
      >
        <div class="image-wrapper">
          <img
            :src="`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`"
            width="480"
            height="360"
            loading="lazy"
            alt=""
          />
          <div class="icon-wrapper">
            <app-icon icon="play" class="icon" />
          </div>
        </div>
        <button class="btn-video" @click="playVideo(video.videoId)">
          <span class="sr-only">{{ $t("play") }}</span>
          {{ video.title }}
        </button>
      </clickable-list-item>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
@custom-media --video-tiles (--viewport-sm);

img {
  width: 100%;
  display: block;
  margin-bottom: var(--spacing-xxs);
}

.image-wrapper {
  position: relative;
}

.icon-wrapper {
  --video-button-size: var(--spacing-m);

  @media (--video-tiles) {
    --video-button-size: var(--spacing-l);
  }

  position: absolute;
  left: 50%;
  top: 50%;
  margin: calc(var(--video-button-size) / -2) 0 0
    calc(var(--video-button-size) / -2);
  color: var(--color-white);

  & :global(svg) {
    width: var(--video-button-size);
    height: var(--video-button-size);
  }
}

.list-item {
  border: 2px solid transparent;
  border-bottom: 2px dashed var(--color-primary);
  padding-bottom: var(--spacing-xs);
  display: grid;
  grid-gap: var(--spacing-m);
  grid-template-columns: 5em auto;

  &:hover,
  &:focus-within,
  &.is-active {
    border-style: solid;
  }

  @media (--video-tiles) {
    display: block;
  }
}

.btn-video {
  text-align: left;

  @media (--video-tiles) {
    text-align: center;
  }
}

.videos {
  max-width: 48em;
}

.list {
  @mixin list-reset;

  display: grid;
  grid-gap: var(--spacing-m);

  @media (--video-tiles) {
    grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  }
}

.btn-video:focus {
  outline: none;
}
</style>
