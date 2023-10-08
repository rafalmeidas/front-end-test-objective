import React from "react";

import styles from "./arrow-button.module.scss";

type ArrowButtonProps = {
  isDouble?: boolean;
  isShow: boolean;
  orientation: "left" | "right";
  label: string;
  onClick: () => void;
};

export default function ArrowButton({
  isDouble = false,
  isShow,
  orientation,
  label,
  onClick,
}: ArrowButtonProps) {
  const className = `${styles.wrapper_arrow_button} ${
    isShow ? styles.isVisible : styles.isNotVisible
  }`;

  const arrowOrientation =
    orientation === "left" ? styles.arrow_left : styles.arrow_right;

  return (
    <button onClick={onClick} aria-label={label} className={className}>
      <div
        className={
          isDouble ? styles.container_double_arrow : styles.container_one_arrow
        }
      >
        <i className={arrowOrientation}></i>
        {isDouble ? <i className={arrowOrientation}></i> : null}
      </div>
    </button>
  );
}
