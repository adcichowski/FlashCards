import * as Yup from "yup";
// /**
//  * @openapi
//  * components:
//  *  schemas:
//  *   Register:
//  *    type: object
//  *    required:
//  *     - email
//  *     - password
//  *     - username
//  *    properties:
//  *     email:
//  *      type: string
//  *      maximum: 60
//  *     password:
//  *      type: string
//  *      maximum: 60
//  *      minimum: 12
//  *     username:
//  *      type: string
//  *      maximum: 32
//  */

export const validateRegisterSchema = Yup.object().shape({
  email: Yup.string()
    .max(64)
    .required("Email is require!")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "It's not email format"),
  password: Yup.string().max(64).min(12).required("Password is require!"),
  username: Yup.string().max(32).required("Username is require!"),
});

// /**
//  * @openapi
//  * components:
//  *  schemas:
//  *   Login:
//  *    type: object
//  *    required:
//  *     - email
//  *     - password
//  *    properties:
//  *     email:
//  *      type: string
//  *      maximum: 60
//  *     password:
//  *      type: string
//  *      maximum: 60
//  *      minimum: 12
//  */

export const validateLoginSchema = Yup.object().shape({
  email: Yup.string()
    .max(64)
    .required("Email is require!")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Change email format!"),
  password: Yup.string().max(64).min(12).required("Password is require!"),
});
