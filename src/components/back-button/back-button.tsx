import { useNavigate } from "react-router-dom";

import styles from "./back-button.module.scss";

import icon from "../../assets/back-icon.svg";

type BackButtonProps = {
  to?: string;
};

export default function BackButton({ to = "/" }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      className={styles.wrapper_back_button}
      onClick={() => navigate(to)}
      aria-label="voltar"
    >
      <img src={icon} alt="voltar" />
      Voltar
    </button>
  );
}
