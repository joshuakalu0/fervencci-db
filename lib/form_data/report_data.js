import * as yup from "yup";
export const report_data = {
  name: {
    type: "text",
    name: "name",
    label: "Name",
    required: true,
  },
  email: { type: "email", name: "email", label: "Email", required: true },
  description: {
    type: "textarea",
    name: "description",
    label: "description",
    required: true,
  },
};

export const report_initial = {
  name: "",
  description: "",
  email: [],
};
export const report_display = ["name", "email"];

export const report_validationSchema = yup.object().shape({
  name: yup.string().required().max(40),
  description: yup.string().required().max(400, "To much"),
  email: yup.string().required().email().max(60),
});
