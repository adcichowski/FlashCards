import { validateRegisterSchema } from "server/src/auth/auth-schema";
import { Form } from "src/pages/auth/components/Form";
import { useAuthMutation } from "src/pages/auth/hooks/useAuthMutation";

export default function Register() {
  const mutation = useAuthMutation({ typeForm: "register" });
  return <Form typeForm="register" yupSchema={validateRegisterSchema} mutation={mutation} />;
}
