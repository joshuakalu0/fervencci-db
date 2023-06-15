import * as yup from "yup";
export const user_data = {
  Username: {
    type: "text",
    name: "username",
    label: "username",
    required: true,
  },
  firstname: {
    type: "text",
    name: "firstname",
    label: "firstname",
    required: true,
  },
  Middlename: { type: "text", name: "middlename", label: "Middlename" },
  Lastname: {
    type: "text",
    name: "lastname",
    label: "lastname",
    required: true,
  },
  Email: { type: "email", name: "email", label: "Email", required: true },
  Date_of_birth: { type: "date", name: "date_of_birth" },
  Tel: { type: "number", name: "tel", label: "Tel" },

  Bio: { type: "textarea", name: "bio", label: "bio", required: true },
  Aim: { type: "textarea", name: "aim", label: "aim", required: true },
  photos: {
    type: "file",
    name: "photos",
    multiple: false,
    accept: "image/*",
    required: true,
  },
  is_staff: {
    type: "checkbox",
    name: "is_staff",
    legend: "Do you want to give this user staff privilages",
    label: "is staff",
  },
  is_readonly: {
    type: "checkbox",
    name: "is_readonly",
    legend: "Do you want to give this user read-only privilages",
    label: "is readonly",
  },
};

export const user_initial = {
  username: "",
  firstname: "",
  middlename: "",
  lastname: "",
  email: "",
  date_of_birth: "",
  tel: "",

  bio: "",
  aim: "",
  photos: [],
  is_staff: false,
  is_readonly: false,
  photoID: "",
};
export const user_display = [
  "username",
  "firstname",
  "email",
  "tel",
  "is_admin",
  "is_staff",
  "is_readonly",
];

export const user_validationSchema = yup.object().shape({
  username: yup.string().required().max(40),
  firstname: yup.string().required().max(40, "To much"),
  middlename: yup.string().required(),
  lastname: yup.string().required().max(40, "To much"),
  email: yup.string().required().email("invalid email").max(60, "To much"),
  date_of_birth: yup.string().required(),
  tel: yup.number().required(),

  bio: yup.string().required(),
  aim: yup.string().required(),
  photos: yup.array().length(1).required(),
  is_staff: yup.boolean(),
  is_readonly: yup.boolean(),
});
