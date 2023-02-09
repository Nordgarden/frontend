import { ISEO } from "./ISEO";

export interface IFeaturedImage {
  id: string;
  srcSet: string;
  src: string;
  alt: string;
  mediaDetails: {
    width: string;
    height: string;
  };
}

interface IFeaturedImageNode {
  node: IFeaturedImage;
}

export interface IBasePage {
  title: string;
  content: string;
  seo: ISEO;
}

export interface IPage extends IBasePage {}

export interface IPost extends IBasePage {
  date: string;
  featuredImage: IFeaturedImageNode | null;
}

export interface IPostListItem {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  featuredImage?: IFeaturedImageNode;
}

interface IPostNode {
  node: IPost;
}

export interface IPosts {
  pageInfo: { hasNextPage: boolean; endCursor: string };
  edges: IPostNode[];
}
