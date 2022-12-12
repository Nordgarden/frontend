export interface ISong {
  title: string;
  file?: string;
}

export interface IPlayableSong extends ISong {
  album: {
    title: string;
    image: string;
  };
}
