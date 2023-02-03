import albums from "~/data/albums";
import playableSongs from "~/data/playableSongs";
import { IPlayableSong } from "~~/types/ISong";

const keys = {
  isPlaying: "audio/isPlaying",
  progress: "audio/progress",
  player: "audio/player",
  currentSong: "audio/currentSong",
};

export const useAudio = () => {
  const currentSong = useState<IPlayableSong>(
    keys.currentSong,
    () => playableSongs[0]
  );
  useState<boolean>(keys.isPlaying, () => false);
  useState<string | null>(keys.progress, () => null);
  const player = useState<HTMLAudioElement | null>(keys.player, () => null);

  const selectSong = async (song: IPlayableSong) => {
    currentSong.value = song;
    await nextTick(async () => {
      await play();
    });
    updateMetaData();
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

  const { mediaSizes } = useAppConfig();
  const formats = ["webp", "avif"];

  const getMediaImages = (image: string) => {
    const images: MediaImage[] = [];
    mediaSizes.forEach((size) => {
      formats.forEach((format) => {
        const src = `${image}-${size}.${format}`;
        images.push({
          src,
          sizes: `${size}x${size}`,
          type: `image/${format}`,
        });
      });
    });
    return images;
  };

  const updateMetaData = () => {
    if (!process.client) return;
    if (!("mediaSession" in window.navigator)) return;
    if (!navigator.mediaSession.metadata) {
      return;
    }

    navigator.mediaSession.metadata.title = currentSong.value.title;
    navigator.mediaSession.metadata.album = currentSong.value.album.title;
    const artwork = getMediaImages(currentSong.value.album.image);
    navigator.mediaSession.metadata.artwork = artwork;
  };

  const setMetaData = () => {
    if (!process.client) return;
    if (!("mediaSession" in window.navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      artist: "Nordgarden",
    });
    updateMetaData();
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
    navigator.mediaSession.setActionHandler(
      "seekbackward",
      (details: MediaSessionActionDetails) => {
        if (!player.value) {
          return;
        }
        player.value.currentTime =
          player.value.currentTime - (details.seekOffset || -10);
      }
    );
    navigator.mediaSession.setActionHandler(
      "seekforward",
      (details: MediaSessionActionDetails) => {
        if (!player.value) {
          return;
        }
        player.value.currentTime =
          player.value.currentTime + (details.seekOffset || 10);
      }
    );
    navigator.mediaSession.setActionHandler("previoustrack", () => {
      previous();
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
      next();
    });
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
    keys,
    playableSongs,
    albums,
    play,
    pause,
    next,
    previous,
    setCurrentTime,
    selectSong,
    setMetaData,
    setMediaSessionEventListeners,
  };
};
