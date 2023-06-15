import { useEffect, useRef, useState } from "react";
import { useFileChange } from "../hooks/useFileChange";
import FileUpload from "../svg/FileUpload";
import { useField, useFormikContext } from "formik";
import FileImages from "./file_utiles/FileImages";
export default function File({ data }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(data);

  const [images, setimages] = useState([]);
  const file = useRef("");
  const div = useRef("");
  const [current, setcurrent] = useState(file.current);
  const [active, setactive] = useState(null);

  const [error, seterror] = useFileChange(setimages, file.current, field);

  useEffect(() => {
    setcurrent(file);
  }, [current]);

  useEffect(() => {
    if (images.length > 4) {
      let temp_error = [...error];
      temp_error.push("maximum number of files exceeded, maximun=5");
      let temp_images = [...images];
      temp_images.pop();
      setimages(temp_images);
      seterror([...temp_error]);
    }
    if (images) {
      let name = data.name;
      setFieldValue(name, images);
    }
  }, [images]);

  function clickhandle(id) {
    setactive(id);
    let temp = [...images];
    temp.splice(id, 1);
    const time = setTimeout(() => {
      setactive(null);
      setimages(temp);
      clearTimeout(time);
    }, 400);
  }

  return (
    <div className='mb-4 mt-2'>
      <div className='w-full flex justify-start align-center '>
        <p>{field.name}</p>
      </div>
      <div
        className={`flex justify-center items-center flex-row min-h-[100px]  shadow-md  rounded-md `}
      >
        <div
          className='w-[10%] min-h-full flex  flex-col items-center'
          onClick={() => file.current.click()}
        >
          <input type='file' ref={file} {...data} hidden />
          <FileUpload />
          <small>{images.length}</small>
        </div>
        <FileImages
          images={images}
          div={div}
          func={clickhandle}
          active={active}
        />
      </div>
      <div className='pl-6'>
        {error.length != 0 &&
          error.map((data, i) => (
            <small key={i} className='text-red-500'>
              {data}
            </small>
          ))}
      </div>
    </div>
  );
}
