import md5 from "md5";

import { Thumbnail } from "../types/marvels";

export const getHash = (
  timeStamp: string,
  privateKey: string,
  publicKey: string
) => md5(timeStamp + privateKey + publicKey);

export const getTimeStamp = () => Date.now().toString();

export const handleResponse = async <T>(response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data.data as T;
};

export const generateThumbnail = (thumb?: Thumbnail | null): string => {
  if (!thumb) return "";

  return `${thumb.path}.${thumb.extension}`;
};
