import * as yup from "yup";

const regPhone = /^\+?[1-9][0-9]{7,14}$/;

const schema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Обязательное поле")
    .min(2, "Необходимо как минимум 2 символа"),
  email: yup
    .string()
    .required("Обязательное поле")
    .email("Неверный формат почты"),
  phone: yup
    .string()
    .required("Обязательное поле")
    .matches(regPhone, "Неверный формат номера"),
  password: yup
    .string()
    .required("Обязательное поле")
    .min(6, "Необходимо как минимум 6 символов"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли не совпадают")
    .required("Обязательное поле"),
});

export default schema;
