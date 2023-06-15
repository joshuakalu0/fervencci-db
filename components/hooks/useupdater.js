import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Dashboardcontext } from "../../pages/_app";
import { display } from "../../lib";

export default function useUpdater() {
  const [isactive, setisactive] = useState(false);
  const [newData, setnewData] = useState(null);
  const [object, setter] = useContext(Dashboardcontext);
  const ro = useRouter();
  const query = ro.query;
  const target = query.page?.toLowerCase() || "user";
  const array = display(target);
  useEffect(() => {
    if (!isactive) {
      const timer = setTimeout(() => {
        setisactive(true);
        clearTimeout(timer);
      }, 5000);
    }
  });
  useEffect(() => {
    let timer;
    if (isactive === true) {
      console.log("isactive check");
      let timer = setTimeout(() => {
        checkerForData();
      }, 5000);
      // let timer = setInterval(() => {
      //   checkerForData();
      // }, 5000);
    }
    return () => {
      // setisactive(false);
      setnewData(null);
      clearInterval(timer);
    };
  }, [isactive]);

  function checkerForData() {
    const limit = 6;
    const field = filter.join(" ");
    let url = `/api/${target}/getall?limit=${limit}&filter=${field}`;
    const temp_array = [];
    axios.get(url, body).then((resp) => {
      let temp_data = resp.data.data;
      const last = object[target][0];
      console.log(temp_data, "temp");
      for (let index = 0; index < temp_data.length; index++) {
        // console.log(last, object);
        console.log("runing", index);
        if (temp_data[index]._id === last?._id) {
          console.log("old data");
          break;
        }
        console.log("still running");
        if (temp_data[index]._id !== last?._id) {
          // object[target].unshift(temp_data[index]);
          temp_array.unshift(temp_data[index]);
          console.log(index, temp_data.length);
          if (index === temp_data.length - 1) {
            addToGlobal(temp_array);
          }
          console.log("new data", temp_data[index], object);
          // return data;
        }
      }
    });
  }
  function addToGlobal(data) {
    const new_tem = [...data, ...object[target]];
    object[target] = new_tem;
    // setter((obj) => {

    //   return {
    //     ...obj,
    //     [target]: new_tem,
    //   };
    // });
  }
  return [];
}
