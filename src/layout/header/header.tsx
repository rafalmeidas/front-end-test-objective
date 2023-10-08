import { useNavigate } from "react-router-dom";

import styles from "./header.module.scss";

import logo from "../../assets/objective.svg";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.wrapper_header}>
      <img src={logo} alt="Logo da Objective" onClick={() => navigate("/")} />
      <div className={styles.wrapper_user}>
        <p>
          <b>Rafael Silva</b> <span>Teste de Front-end</span>
        </p>
        <div className={styles.profile}>CB</div>
      </div>
    </header>
  );
}
