export interface IWordpressTag {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  _links: Links;
}

export interface ICategory {
  id: number;
  name: string;
  count?: number;
}

export interface Links {
  self: Self[];
  collection: Collection[];
}

export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}



