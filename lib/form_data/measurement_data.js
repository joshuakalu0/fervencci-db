import * as yup from "yup";
export const measurement_data = {
  client_name: {
    type: "text",
    name: "client_name",
    label: "client name",
    required: true,
  },
  client_Tel: {
    type: "number",
    name: "client_Tel",
    required: true,
    label: "client Tel",
  },
  Client_location: {
    type: "text",
    name: "client_location",
    label: "client location",
    required: true,
  },
  chest: { type: "number", name: "chest", label: "chest" },
  waist: { type: "number", name: "waist", label: "waist" },
  hip: { type: "number", name: "hip", label: "hip" },
  thigh: { type: "number", name: "thigh", label: "thigh" },
  neck: { type: "number", name: "neck", label: "neck" },
  inseam: { type: "number", name: "inseam", label: "inseam" },
  sleeve: { type: "number", name: "sleeve", label: "sleeve" },
  design_choice: {
    type: "file",
    name: "design_choice",
    multiple: false,
    accept: "image/*",
  },
  material: {
    type: "file",
    name: "material",
    multiple: false,
    accept: "image/*",
  },
  description: {
    type: "textarea",
    name: "description",
    label: "description",
    required: true,
  },
};

export const measurement_data_first = {
  client_name: {
    type: "text",
    className: "px-2",
    name: "client_name",
    label: "client name",
    required: true,
  },
  client_Tel: {
    type: "number",
    className: "px-2",
    name: "client_Tel",
    required: true,
    label: "client Tel",
  },
  Client_location: {
    type: "text",
    className: "px-2",
    name: "client_location",
    label: "client location",
    required: true,
  },
};
export const measurement_data_last = {
  chest: {
    type: "number",
    className: "w-1/2 px-2 ",
    name: "chest",
    label: "chest",
  },
  waist: {
    type: "number",
    className: "w-1/2 px-2 ",
    name: "waist",
    label: "waist",
  },
  hip: { type: "number", className: "w-1/2 px-2 ", name: "hip", label: "hip" },
  thigh: {
    type: "number",
    className: "w-1/2 px-2 ",
    name: "thigh",
    label: "thigh",
  },
  neck: {
    type: "number",
    className: "w-1/2 px-2 ",
    name: "neck",
    label: "neck",
  },
  inseam: {
    type: "number",
    className: "w-1/2 px-2 ",
    name: "inseam",
    label: "inseam",
  },
  sleeve: {
    type: "number",
    className: "w-1/2 px-2 ",
    name: "sleeve",
    label: "sleeve",
  },
  description: {
    type: "textarea",
    className: "w-1/2 px-2 ",
    name: "description",
    label: "description",
    required: true,
  },
};

export const measurement_initial = {
  client_name: "",
  client_Tel: "",
  client_location: "",
  design_choice: [],
  material: [],
  photoID: "",
  chest: "",
  waist: "",
  hip: "",
  thigh: "",
  neck: "",
  inseam: "",
  sleeve: "",
  description: "",
};
export const measurement_display = [
  "client_name",
  "description",
  "client_location",
];
export const measurement_validationSchema = yup.object().shape({
  client_name: yup.string().required(),
  client_Tel: yup.number().required(),
  client_location: yup.string().required(),
  design_choice: yup.array().length(1).required(),
  material: yup.array().length(1).required(),
  chest: yup.number(),
  waist: yup.number(),
  hip: yup.number(),
  thigh: yup.number(),
  neck: yup.number(),
  inseam: yup.number(),
  sleeve: yup.number(),
  description: yup.string().required(),
});
