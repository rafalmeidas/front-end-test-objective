import { getHash, getTimeStamp, handleResponse } from "./functions";
import { CharactersDataWrapper, ComicsDataWrapper } from "../types/marvels";

const API_BASE_URL = "https://gateway.marvel.com/v1/public";
const API_PUBLIC_KEY = "e14c1af910e50f7fb739fb86491ef585";
const API_PRIVATE_KEY = "ba6763fd121abe2988244fdd63da661d6e30ff02";

const timeStamp = getTimeStamp();
const hash = getHash(timeStamp, API_PRIVATE_KEY, API_PUBLIC_KEY);

const query = `ts=${timeStamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;

export const getCharacteres = async (
  name?: string,
  itemsPerPage?: number,
  offsetNumber?: number
): Promise<CharactersDataWrapper> => {
  const limit = itemsPerPage ? itemsPerPage : "10";
  const nameStartsWith = name ? `&nameStartsWith=${name}` : "";
  const offset = offsetNumber ? `&offset=${offsetNumber}` : "";

  const url = `${API_BASE_URL}/characters?${query}&limit=${limit}${offset}${nameStartsWith}`;

  const response = await fetch(url);

  return handleResponse<CharactersDataWrapper>(response);
};

export const getCharacter = async (
  id: number
): Promise<CharactersDataWrapper> => {
  const url = `${API_BASE_URL}/characters/${id}?${query}`;

  const response = await fetch(url);

  return handleResponse<CharactersDataWrapper>(response);
};

export type MediaType = "comics" | "series" | "stories" | "events";

export const getMedia = async (
  mediaType: MediaType,
  id: number,
  itemsPerPage?: number,
  offsetNumber?: number
): Promise<ComicsDataWrapper> => {
  const limit = itemsPerPage ? itemsPerPage : "10";
  const offset = offsetNumber ? `&offset=${offsetNumber}` : "";

  const url = `${API_BASE_URL}/characters/${id}/${mediaType}?${query}&limit=${limit}${offset}`;

  const response = await fetch(url);

  return handleResponse<ComicsDataWrapper>(response);
};
