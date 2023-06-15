import { TextField } from "@mui/material";
import { useField } from "formik";

export default function Input({ data }) {
  const [field, meta] = useField(data);
  const config = {
    ...data,
    fullWidth: true,
    ...field,
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helpertext = meta.error;
  }

  return (
    <div className={`w-full ${data.className && data.className}`}>
      <TextField {...config} className='my-2 shadow-md' />
      {meta && meta.touched && meta.error && (
        <small className=' italic text-red-600'>{meta.error} </small>
      )}
    </div>
  );
}
