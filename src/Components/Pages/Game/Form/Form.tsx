import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Form() {
  const [isRegister, setRegister] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const handleClick = () => setRegister(!isRegister);
  return isRegister ? (
    <Login
      handleClick={handleClick}
      setLoading={() => setLoading(!isLoading)}
    />
  ) : (
    <Register handleClick={handleClick} />
  );
}
