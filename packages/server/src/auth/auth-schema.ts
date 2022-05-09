import Yup from "yup";
export const validateRegisterSchema = Yup.object().shape({
  email: Yup.string().max(64).required("Email is require!"),
  password: Yup.string().max(64).min(12).required("Password is require!"),
  userName: Yup.string().max(32).required("Username is require!"),
});

export const validateLoginSchema = Yup.object().shape({
  email: Yup.string().max(64).required("Email is require!"),
  password: Yup.string().max(64).min(12).required("Password is require!"),
});
