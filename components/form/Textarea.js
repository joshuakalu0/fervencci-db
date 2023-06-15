import { TextField } from "@mui/material";
import { useField } from "formik";

export default function Textarea({ data }) {
  const [field, meta] = useField(data.name);

  const config = {
    ...data,
    fullWidth: true,
    multiline: true,
    rows: 5,
    ...field,
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helpertext = meta.error;
  }

  return (
    <div className={`w-full ${data.className && data.className}`}>
      <TextField {...config} className={` rounded-md  my-2`} />
      {meta && meta.touched && meta.error && (
        <small className=' italic text-red-600'>{meta.error} </small>
      )}
    </div>
  );
}
