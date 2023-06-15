import * as yup from "yup";
export const login_data = {
  Email: { type: "email", name: "email", label: "Email", required: true },
  Password: {
    type: "password",
    name: "password",
    label: "password",
    required: true,
  },
};

export const login_initial = {
  email: "",
  password: "",
  csrfToken: "",
};

export const login_validationSchema = yup.object().shape({
  email: yup.string().required().email("invalid email").max(60, "To much"),
  password: yup.string().required(),
});
