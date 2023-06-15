
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import { useField, useFormikContext } from "formik";

export default function Checkboxinput({
    data
}) {
    const [field, meta ] = useField(data)
    const { setFieldValue } = useFormikContext()
    function handlechange(ev){
        const {checked} = ev.target
        setFieldValue(data.name,checked)
    }
    const object= {
        ...field,
        onChange:handlechange
    }
    const objectE = {}
    if(meta && meta.error && meta.touched){
        objectE.error=true
    }
  return (
    <div>
        <FormControl {...objectE}>
        <FormLabel component={'legend'}>{data.legend}</FormLabel>
        <FormGroup>
            <FormControlLabel
            control={<Checkbox  {...object} />}
            label={data.label}
            />
        </FormGroup>
        </FormControl>
        </div>
  )
}