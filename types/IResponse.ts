import { ISEO } from "./ISEO";

interface IResponseImageSize {
  width: number;
  height: number;
  source_url: string;
}

export interface IResponseImage {
  "wp:featuredmedia"?: {
    alt_text: string;
    source_url: string;
    media_details: {
      width: number;
      height: number;
      sizes: {
        thumbnail: IResponseImageSize;
        full: IResponseImageSize;
        medium?: IResponseImageSize;
        large?: IResponseImageSize;
        medium_large?: IResponseImageSize;
      };
    };
  }[];
}

export interface IResponsePost {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  yoast_head_json: ISEO;
  date: string;
  _embedded: IResponseImage;
}

export interface IResponsePosts {
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  _embedded: IResponseImage;
}

export interface IResponsePage {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  yoast_head_json: ISEO;
}
