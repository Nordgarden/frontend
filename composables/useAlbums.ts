import { Ref } from "vue";
import albums from "~/data/albums";
import { ISong } from "~~/types/ISong";

const isPlaying = ref(false);
const currentSong: Ref<ISong | undefined> = ref(undefined);

export const useAlbums = () => {
  const playableSongs = computed(() => {
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
    return newArray;
  });

  return {
    isPlaying,
    currentSong,
    playableSongs,
    albums,
  };
};
