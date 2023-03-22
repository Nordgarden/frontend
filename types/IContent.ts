import { ISEO } from './ISEO'

export interface IFeaturedImage {
  srcSet: string;
  src: string;
  alt: string;
  width: number;
  height: number;
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
  id: number;
  date: string;
  featuredImage: IFeaturedImageNode | null;
}

export interface IPostListItem {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  featuredImage?: IFeaturedImage;
}

interface IPostNode {
  node: IPost;
}

export interface IPosts {
  pageInfo: { hasNextPage: boolean; endCursor: string };
  edges: IPostNode[];
}
