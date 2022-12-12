import { Ref } from "vue";
import albums from "~/data/albums";
import playableSongs from "~/data/playableSongs";
import { IPlayableSong } from "~~/types/ISong";

const currentSong: Ref<IPlayableSong> = ref(playableSongs[0]);
const isPlaying = ref(false);
const progress: Ref<null | string> = ref(null);
const player: Ref<HTMLAudioElement | null> = ref(null);

export const useAudio = () => {
  const selectSong = async (song: IPlayableSong) => {
    currentSong.value = song;
    nextTick(async () => {
      await play();
    });
  };

  const play = async () => {
    if (!player.value) {
      return;
    }
    await player.value.play();
  };
  const pause = () => {
    if (!player.value) {
      return;
    }
    player.value.pause();
  };
  const previous = async () => {
    const currentSongIndex = playableSongs.findIndex((song) => {
      return song.title === currentSong.value?.title;
    });
    let previousSongIndex;
    if (currentSongIndex === 0) {
      previousSongIndex = playableSongs.length - 1;
    } else {
      previousSongIndex = currentSongIndex - 1;
    }

    await selectSong(playableSongs[previousSongIndex]);
  };

  const next = async () => {
    const currentSongIndex = playableSongs.findIndex((song) => {
      return song.title === currentSong.value?.title;
    });
    let nextSongIndex;
    if (currentSongIndex + 1 >= playableSongs.length) {
      nextSongIndex = 0;
    } else {
      nextSongIndex = currentSongIndex + 1;
    }
    await selectSong(playableSongs[nextSongIndex]);
  };

  const setCurrentTime = (offsetX: number) => {
    if (!player.value) {
      return;
    }
    const scrubTime = offsetX * player.value.duration;
    player.value.currentTime = scrubTime;
  };

  return {
    isPlaying,
    currentSong,
    playableSongs,
    albums,
    play,
    pause,
    player,
    next,
    previous,
    setCurrentTime,
    progress,
    selectSong,
  };
};
