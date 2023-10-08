export interface Thumbnail {
  path: string;
  extension: string;
}

interface SubItem {
  resourceURI: string;
  name: string;
}

export interface Item {
  available: number;
  collectionURI: string;
  items: SubItem[];
  returned: number;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  comics: Item;
  series: Item;
  events: Item;
}

export interface Media {
  id: number;
  title: string;
  thumbnail: Thumbnail;
}

export interface CharactersDataWrapper {
  results: Character[];
  total: number;
}

export interface ComicsDataWrapper {
  results: Media[];
  total: number;
}
