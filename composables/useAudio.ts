import { Ref } from "vue";
import albums from "~/data/albums";
import { ISong } from "~~/types/ISong";

const isPlaying = ref(false);
const progress: Ref<null | string> = ref(null);
const currentSong: Ref<ISong | undefined> = ref(undefined);
const playableSongs: Ref<ISong[]> = ref([]);
const player: Ref<HTMLAudioElement | null> = ref(null);

export const useAudio = () => {
  const setPlayableSongs = () => {
    let newArray: ISong[] = [];
    albums.forEach((album) => {
      const songs = album.songlist.filter((song) => song.file !== undefined);
      const songsWithAlbum = songs.map((song) => {
        return {
          ...song,
          album: {
            title: album.title,
            image: album.image,
          },
        };
      });
      newArray = [...newArray, ...songsWithAlbum];
    });
    playableSongs.value = newArray;
    if (newArray.length) {
      currentSong.value = newArray[0];
    }
  };

  const play = async () => {
    console.log(player.value);
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
    const currentSongIndex = playableSongs.value.findIndex((song) => {
      return song.title === currentSong.value?.title;
    });
    let previousSongIndex;
    if (currentSongIndex === 0) {
      previousSongIndex = playableSongs.value.length - 1;
    } else {
      previousSongIndex = currentSongIndex - 1;
    }
    currentSong.value = playableSongs.value[previousSongIndex];
    nextTick(async () => {
      await play();
    });
  };
  const next = async () => {
    const currentSongIndex = playableSongs.value.findIndex((song) => {
      return song.title === currentSong.value?.title;
    });
    let nextSongIndex;
    if (currentSongIndex + 1 >= playableSongs.value.length) {
      nextSongIndex = 0;
    } else {
      nextSongIndex = currentSongIndex + 1;
    }
    currentSong.value = playableSongs.value[nextSongIndex];
    nextTick(async () => {
      await play();
    });
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
    setPlayableSongs,
    play,
    pause,
    player,
    next,
    previous,
    setCurrentTime,
    progress,
  };
};
