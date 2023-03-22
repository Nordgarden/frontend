export interface ISEOImage {
  mediaItemUrl: string | null;
}

export interface ISEO {
  description: string;
  canonical: string;
  cornerstone: boolean;
  og_author: string;
  og_description: string;
  og_image?: ISEOImage;
  og_modifiedTime: string;
  og_publishedTime: string;
  og_publisher: string;
  og_title: string;
  og_type:
    | 'website'
    | 'article'
    | 'book'
    | 'profile'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_status'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other';
  og_url: string;
  title: string;
  twitterDescription: string;
  twitterImage?: ISEOImage;
  twitterTitle: string;
  schema: Object;
}
