import styles from "./character-search.module.scss";

import searchIcon from "../../assets/search.svg";

type CharacterSearchProps = {
  onChange: (value: string) => void;
  value: string;
};

export default function CharacterSearch({
  onChange,
  value,
}: CharacterSearchProps) {
  return (
    <div className={styles.character_search}>
      <label htmlFor="search">Nome do personagem</label>
      <div className={styles.search_input}>
        <input
          aria-label="buscar personagem"
          type="text"
          placeholder="Search"
          id="search"
          onChange={({ target }) => onChange(target.value)}
          value={value}
        />
        <button aria-label="buscar personagem">
          <img src={searchIcon} alt="busca de personagem" />
        </button>
      </div>
    </div>
  );
}
