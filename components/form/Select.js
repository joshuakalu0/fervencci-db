import { MenuItem, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

export default function Select({ data, ...other }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(other.name);
  const object = other.object;
  function handlechange(ev) {
    const value = ev.target.value;
    setFieldValue(data, value);
  }
  const config = {
    ...data,
    fullWidth: true,
    select: true,
    ...field,
    onchange: handlechange,
  };
  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helpertext = meta.error;
  }
  return (
    <TextField {...config}>
      {object.map((option, id) => {
        return (
          <MenuItem key={id} value={option.value}>
            {option.label}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
