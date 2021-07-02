import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Form() {
  const [isRegister, setRegister] = useState(true);
  const handleClickRegister = () => setRegister(!isRegister);

  return isRegister ? (
    <Login handleClickRegister={handleClickRegister} />
  ) : (
    <Register />
  );
}
