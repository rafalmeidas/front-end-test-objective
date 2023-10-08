import styles from "./character-card-header.module.scss";

export default function CharacterCardHeader() {
  return (
    <section className={styles.wrapper_character_card_header}>
      <span>Personagem</span>
      <span className={styles.name}>Séries</span>
      <span className={styles.name}>Eventos</span>
    </section>
  );
}
