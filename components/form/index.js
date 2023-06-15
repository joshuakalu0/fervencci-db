import Checkboxinput from "./Checkboxinput";
import File from "./File";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";

export default function FormGenerator({ object }) {
  return (
    <>
      {Object.values(object).map((data, id) => {
        let { type } = data || "skip";
        return <Inputs type={type} obj={data} key={id} />;
      })}
    </>
  );
}
function Inputs({ type, obj }) {
  if (type == "select") {
    return <Select data={obj} />;
  } else if (type == "file") {
    return <File data={obj} />;
  } else if (type == "textarea") {
    return <Textarea data={obj} />;
  }else if (type == "checkbox") {
    return <Checkboxinput data={obj} />;
  }  else if (type == "skip") {
    return;
  }
  return <Input data={obj} />;
}
