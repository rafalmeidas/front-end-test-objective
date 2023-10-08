import { useNavigate } from "react-router-dom";

import { Character, Item } from "../../types/marvels";

import styles from "./character-card.module.scss";

type CharacterCardProps = {
  character: Character;
};

export default function CharacterCard({ character }: CharacterCardProps) {
  const navigate = useNavigate();

  const thumbnail = `${character.thumbnail.path}.${character.thumbnail.extension}`;
  const series = character.series;
  const events = character.events;

  const handleNavigate = () => {
    navigate(`/character/${character.id}`);
  };

  const renderList = (options: Item): JSX.Element => {
    return (
      <ul>
        {options.items.slice(0, 3).map(({ name }, index) => (
          <li key={`${name}-${index}`}>
            {name}
            {index < 2 && <br />}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <article className={styles.wrapper_character_card} onClick={handleNavigate}>
      <div>
        <img width={48} height={48} src={thumbnail} alt={character.name} />
        <p>{character.name}</p>
      </div>
      <div className={styles.list}>{renderList(series)}</div>
      <div className={styles.list}>{renderList(events)}</div>
    </article>
  );
}
