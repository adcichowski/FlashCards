import { Link } from "react-router-dom";
import { ButtonInterface } from "../../Types/Types";
import styles from "./Button.module.scss";

function Button({ type, children, onClick, size }: ButtonInterface) {
  const stylesButton = {
    parent: styles[size + "Button"],
    children: styles[size + "Front"],
  };
  if (typeof type === "object") {
    return (
      <Link
        to={`/${type.href}`}
        className={`${styles.button} ${stylesButton.parent}`}
      >
        <span className={`${styles.front} ${stylesButton.children}`}>
          {children}
        </span>
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${stylesButton.parent}`}
    >
      <span className={`${styles.front} ${stylesButton.children}`}>
        {children}
      </span>
    </button>
  );
}
export { Button };
Button.displayName = "Button";
