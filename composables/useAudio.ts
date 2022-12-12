import albums from "~/data/albums";
import playableSongs from "~/data/playableSongs";
import { IPlayableSong } from "~~/types/ISong";

export const useAudio = () => {
  const currentSong = useState<IPlayableSong>(
    "currentSong",
    () => playableSongs[0]
  );
  useState<boolean>("isPlaying", () => false);
  useState<string | null>("progress", () => null);
  const player = useState<HTMLAudioElement | null>("player", () => null);

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

  const updateMetaData = () => {
    if (!process.client) return;
    if (!("mediaSession" in window.navigator)) return;
    if (!navigator.mediaSession.metadata) {
      return;
    }

    navigator.mediaSession.metadata.title = currentSong.value.title;
    navigator.mediaSession.metadata.album = currentSong.value.album.title;
    const sizes = [96, 128, 192, 256, 384, 512];
    const artwork = sizes.map((size) => {
      return {
        // src: `/media/albums/${currentSong.value.album.image}/${size}.png`,
        src: `/media/albums/changes/${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
      };
    });
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
    updateMetaData();
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
    updateMetaData();
  };

  const setCurrentTime = (offsetX: number) => {
    if (!player.value) {
      return;
    }
    const scrubTime = offsetX * player.value.duration;
    player.value.currentTime = scrubTime;
  };

  return {
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
