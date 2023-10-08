import styles from "./loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.loaderContainer} data-testid="loader">
      <div className={styles.loader}></div>
    </div>
  );
}
