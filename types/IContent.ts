export interface IFeaturedImage {
  id: string;
  srcSet: string;
  src: string;
  mediaDetails: {
    width: string;
    height: string;
  };
}

interface IFeaturedImageNode {
  node: IFeaturedImage;
}

export interface IContent {
  title: string;
}

export interface IPage extends IContent {
  content: string;
}

export interface IPost extends IContent {
  date: string;
  id: string;
  slug: string;
  excerpt: string;
  featuredImage: IFeaturedImageNode | null;
  content: string;
  databaseId: string;
}

interface IPostNode {
  node: IPost;
}

export interface IPosts {
  pageInfo: { hasNextPage: boolean; endCursor: string };
  edges: IPostNode[];
}
