import { ISong } from './ISong'

export interface IAlbum {
  title: string;
  image: string;
  spotify: string;
  apple: string;
  releaseDate: string;
  songlist: ISong[];
}
