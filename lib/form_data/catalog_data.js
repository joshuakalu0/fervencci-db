import * as yup from "yup";
export const catalog_data = {
  design_name: {
    type: "text",
    name: "design_name",
    label: "design name",
    required: true,
  },
  description: {
    type: "textarea",
    name: "description",
    label: "description",
    required: true,
  },

  photos: {
    type: "file",
    name: "photos",
    multiple: true,
    accept: "image/*",
    required: true,
  },
};

export const catalog_initial = {
  design_name: "",
  description: "",
  photos: [],
  photoID: "",
};
export const catalog_display = ["design_name", "description"];

export const catalog_validationSchema = yup.object().shape({
  design_name: yup.string().required().max(40),
  description: yup.string().required().max(400, "To much"),
  photos: yup.array().required(),
});
