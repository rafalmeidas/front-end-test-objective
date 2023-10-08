import { useEffect, useState, cloneElement } from "react";
import { useParams } from "react-router-dom";

import InfoMediaList from "../../components/info-media-list/info-media-list";
import PaginatorContextProvider from "../../contexts/paginator-context";
import BackButton from "../../components/back-button/back-button";
import Loader from "../../components/loader/loader";

import { Character as CharacterType } from "../../types/marvels";
import { getCharacter } from "../../utils/api";

import styles from "./character.module.scss";

type RenderProviderProps = {
  id?: string;
  elem: JSX.Element;
};

function RenderProvider({ id, elem }: RenderProviderProps) {
  if (!id) return null;

  return (
    <PaginatorContextProvider itemsPerPage={6}>
      {cloneElement(elem, { ...elem.props, id: parseInt(id) })}
    </PaginatorContextProvider>
  );
}

export default function Character() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [character, setCharacter] = useState<CharacterType | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const loadCharacter = () => {
      if (id) {
        const intId = parseInt(id);
        setIsLoading(true);
        getCharacter(intId)
          .then(({ results }) => {
            setCharacter(results[0]);
          })
          .finally(() => setIsLoading(false));
      }
    };

    loadCharacter();

    return () => {
      setIsLoading(false);
    };
  }, [id]);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <div className={styles.wrapper_character}>
        <BackButton />
        <h1>Detalhes do Personagem</h1>
        {character ? (
          <div className={styles.character_details}>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <div>
              <h2>{character.name}</h2>
              <p>
                {character.description
                  ? character.description
                  : "Sem descrição..."}
              </p>
            </div>
          </div>
        ) : null}

        <RenderProvider
          id={id}
          elem={
            <InfoMediaList title="Histórias em quadrinhos" mediaType="comics" />
          }
        />
        <RenderProvider
          id={id}
          elem={<InfoMediaList title="Series" mediaType="series" />}
        />
        <RenderProvider
          id={id}
          elem={<InfoMediaList title="Histórias" mediaType="stories" />}
        />
        <RenderProvider
          id={id}
          elem={<InfoMediaList title="Eventos" mediaType="events" />}
        />
      </div>
    </>
  );
}
