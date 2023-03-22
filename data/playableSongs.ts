import { IPlayableSong } from '~/types/ISong'
import albums from '~/data/albums'

const getPlayableSongs = () => {
  let playableSongsWithAlbum: IPlayableSong[] = []
  albums.forEach((album) => {
    const songs = album.songlist.filter(song => song.file !== undefined)
    const albumSongs: IPlayableSong[] = songs.map((song) => {
      return {
        title: song.title,
        file: song.file,
        album: {
          title: album.title,
          image: album.image
        }
      }
    })
    playableSongsWithAlbum = [...playableSongsWithAlbum, ...albumSongs]
  })
  return playableSongsWithAlbum
}

const playableSongs = getPlayableSongs()

export default playableSongs
