import { Outlet } from "react-router-dom";

import Header from "../header/header";

import styles from "./container.module.scss";

export default function Container() {
  return (
    <>
      <Header />
      <main data-testid="main" className={styles.wrapper}>
        <Outlet />
      </main>
    </>
  );
}
