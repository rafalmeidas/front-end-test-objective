import { useEffect, useState } from "react";

import InfoMediaCard from "../info-media-card/info-media-card";
import usePaginator from "../../hooks/usePaginator";
import Paginator from "../paginator/paginator";
import Loader from "../loader/loader";

import { generateThumbnail } from "../../utils/functions";
import { MediaType, getMedia } from "../../utils/api";
import { Media } from "../../types/marvels";

import styles from "./info-media-list.module.scss";

export type InfoMediaListProps = {
  id?: number;
  title: string;
  mediaType: MediaType;
  itemsPerPage?: number;
  emptyMessage?: string;
};

export default function InfoMediaList({
  id,
  title,
  mediaType,
  itemsPerPage = 6,
  emptyMessage = "Nenhuma mídia disponível.",
}: InfoMediaListProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [media, setMedia] = useState<Media[]>([]);

  const { setCurrentPage, setTotalResults, handleOnChange } = usePaginator();

  const loadMedia = (offset?: number) => {
    if (id) {
      setIsLoading(true);
      getMedia(mediaType, id, itemsPerPage, offset)
        .then(({ results, total }) => {
          setTotalResults(total);
          setMedia(results);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleOnChangePage = (page: number) => {
    setCurrentPage(page);
    handleOnChange(page);
    loadMedia((page - 1) * itemsPerPage);
  };

  useEffect(() => {
    loadMedia();

    return () => {
      setIsLoading(false);
    };
  }, [id]);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <div className={styles.wrapper_info_media_list}>
        <h2>{title}</h2>
        <section className={styles.media}>
          {media.length === 0 ? (
            <span role="alert">{emptyMessage}</span>
          ) : (
            media.map(({ id, thumbnail, title }) => (
              <InfoMediaCard
                key={id}
                src={generateThumbnail(thumbnail)}
                title={title}
              />
            ))
          )}
        </section>
        <div className={styles.wrapper_paginator}>
          <Paginator onChangePage={handleOnChangePage} />
        </div>
      </div>
    </>
  );
}
