import styles from "./Form.module.scss";
import { Modal } from "../../Components/Modal/Modal";
import { Button } from "../../Components/Button/Button";
import { BackButton } from "../../Components/Button/BackButton/BackButton";
import { useFormLoginRegister } from "./useFormLoginRegister";
import { capitalize, inputValidation } from "../../Utils/Utils";
import { Link } from "react-router-dom";
import { Game } from "../Game/Game";
function Form({ type }: { type: "login" | "register" }) {
  const { onSubmit, handleSubmit, register, errors } = useFormLoginRegister({
    type,
  });
  return (
    <Game>
      <div className={styles.game}>
        <div
          style={{
            border: type === "login" ? "4px solid #2b3361" : "4px solid #A01934",
          }}
          className={styles.formLog}
        >
          <BackButton pathTo="/" />
          <h1 className={styles.formTitle}>{`${capitalize(type)} In`}</h1>
          <form className={styles.gameForm} onSubmit={handleSubmit(onSubmit)}>
            <label>
              <span className="sr-only">email</span>

              <input
                {...register("email", inputValidation.email)}
                className={styles.inputEmail}
                placeholder="Email:"
                autoComplete="off"
              />
            </label>
            <span className={styles.errorInfo}>{errors?.email?.message} </span>
            <label>
              <span className="sr-only">Password</span>
              <input
                {...register("password", inputValidation.password)}
                className={styles.inputPassword}
                placeholder="Password:"
                type="password"
                autoComplete="current-password"
              />
            </label>
            <span className={styles.errorInfo}>{errors?.password?.message}</span>

            <div className={styles.formButtons}>
              <Button size="normal" type="submit">
                {capitalize(type)}
              </Button>
            </div>
            <p className={styles.question}>
              {type === "login" ? "Haven't got an account?" : "Have account?"}{" "}
              <span className={styles.questionType}>
                <Link to={type === "login" ? "/register" : "/login"}>{type === "login" ? "Register" : "Login"}</Link>
              </span>
            </p>
          </form>
        </div>

        <Modal />
      </div>
    </Game>
  );
}
export { Form };
Form.displayName = "Form";
