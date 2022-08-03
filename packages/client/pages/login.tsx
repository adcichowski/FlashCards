import { Form } from "src/pages/auth/components/Form";
import { useAuthMutation } from "src/pages/auth/hooks/useAuthMutation";
import { validateLoginSchema } from "server/src/auth/auth-schema";
export default function Login() {
  const mutation = useAuthMutation({ typeForm: "login" });
  return <Form typeForm="login" yupSchema={validateLoginSchema} mutation={mutation} />;
}
