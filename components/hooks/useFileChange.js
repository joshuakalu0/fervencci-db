import { useField } from "formik";
import { useEffect, useState } from "react";

export const useFileChange = (func, input, field) => {
  const [event, setevent] = useState(null);
  const [check, setcheck] = useState(false);

  useEffect(() => {
    if (field.value != undefined && check != true) {
      if (field.value.length != 0) {
        func((obj) => {
          let temp = [...field.value];
          return temp;
        });
        setcheck(true);
      }
    }
  }, [field.value]);

  useEffect(() => {
    if (input != "") {
      console.dir(input);
      input.onchange = (ev) => setevent(ev);
    }
  }, [input]);
  useEffect(() => {
    if (event != null) {
      handlechange(event);
    }
  }, [event]);

  const [error, seterror] = useState([]);
  let length = 0;
  let location = 1;
  let reading = false;

  const object = [];
  let file = [];

  function readfile() {
    if (reading) return;

    if (location > length) {
      //   let temp_data = [...obj, ...object];
      func((obj) => {
        let temp = [...obj, ...object];
        return temp;
      });
      setevent(null);
      //   return temp_data;
    }

    if (location <= length) {
      const reader = new FileReader();
      reading = true;
      let current = file[location - 1];
      if (file.size > 8000000) {
        let temp = [...error];
        temp.push("File size must to exceed 8mb");
        seterror([...temp]);
      }
      reader.readAsDataURL(current);
      reader.onload = (data) => {
        object.push(data.target.result);

        reading = false;
        location++;
        readfile();
      };
      reader.onerror = (err) => {
        let temp = [...error];
        temp.push("An error occured while trying to read a file");
        seterror([...temp]);
      };
    }
  }

  function handlechange(ev) {
    file = [...ev.target.files];
    length = file.length;
    if (length > 4) {
      let temp = [...error];
      temp.push("maximum number of files exceeded, maximun=5");
      seterror([...temp]);
    }

    readfile();
  }
  useEffect(() => {
    if (error.length != 0) {
      console.log(error);
    }
  }, [error]);

  return [error, seterror];
};
