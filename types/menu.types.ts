export type MenuDto = {
  collections: Array<{
    name: string;
    slug: string;
  }>;
  categories: Array<{
    name: string;
    slug: string;
  }>;
};
