import * as yup from "yup";
export const password_data = {
  Password: {
    type: "password",
    name: "password",
    label: "password",
    required: true,
  },
  Password2: {
    type: "password",
    name: "password2",
    label: "password again",
    required: true,
  },
};

export const password_initial = {
  password: "",
  password2: "",
};

export const password_validationSchema = yup.object().shape({
  password: yup.string().required(),
  password2: yup.string().required(),
});
