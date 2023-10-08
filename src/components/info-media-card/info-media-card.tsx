import styles from "./info-media-card.module.scss";

type InfoMediaCardProps = {
  src: string;
  title: string;
};

export default function InfoMediaCard({ src, title }: InfoMediaCardProps) {
  return (
    <article className={styles.wrapper_info_media_card}>
      {src ? <img src={src} alt={title} /> : <span>N/D</span>}
      <h4 className={styles.list}>{title}</h4>
    </article>
  );
}
