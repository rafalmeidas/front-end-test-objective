import { useEffect, useState } from "react";

import CharacterCardHeader from "../../components/character-card-header/character-card-header";
import CharacterSearch from "../../components/character-search/character-search";
import CharacterCard from "../../components/character-card/character-card";
import Paginator from "../../components/paginator/paginator";
import usePaginator from "../../hooks/usePaginator";
import Loader from "../../components/loader/loader";

import { getCharacteres } from "../../utils/api";

import { Character } from "../../types/marvels";

import styles from "./home.module.scss";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [delayedSearch, setDelayedSearch] = useState<NodeJS.Timeout | null>(
    null
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([]);

  const { setCurrentPage, setTotalResults, handleOnChange } = usePaginator();

  const itemsPerPage = 10;
  const alertMessage = "Oops.. Nenhum personagem disponível no momento 🦸🏻‍♀️🦸🏽‍♂️...";

  const loadCharacters = (name?: string, offset?: number) => {
    setIsLoading(true);
    getCharacteres(name, itemsPerPage, offset)
      .then(({ total, results }) => {
        setTotalResults(total);
        setCharacters(results);
      })
      .finally(() => setIsLoading(false));
  };

  const handleOnChangeSearchValue = (value: string) => {
    setCurrentPage(1);
    setSearchValue(value);

    if (delayedSearch) clearTimeout(delayedSearch);

    if (!value) return;

    const novoDelayedSearch = setTimeout(() => {
      loadCharacters(value.toLocaleLowerCase());
    }, 500);

    setDelayedSearch(novoDelayedSearch);
  };

  const handleOnChangePage = (page: number) => {
    setCurrentPage(page);
    handleOnChange(page);
    loadCharacters(searchValue, (page - 1) * itemsPerPage);
  };

  useEffect(() => {
    loadCharacters();

    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <>
      <div className={styles.wrapper_home}>
        <h2>Busca de personagens</h2>

        <CharacterSearch
          onChange={handleOnChangeSearchValue}
          value={searchValue}
        />

        {isLoading ? <Loader /> : null}

        {characters.length === 0 ? (
          <span className={styles.alert} role="alert" aria-label={alertMessage}>
            {alertMessage}
          </span>
        ) : (
          <>
            <CharacterCardHeader />

            <section className={styles.card_list}>
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </section>
          </>
        )}
      </div>

      <div className={styles.wrapper_paginator}>
        <Paginator onChangePage={handleOnChangePage} />
      </div>
    </>
  );
}
