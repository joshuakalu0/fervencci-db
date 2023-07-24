import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Dashboardcontext } from "../../pages/_app";
import { display } from "../../lib";

export default function useFetcher(setisdata, setpagecount) {
  const [object, setter] = useContext(Dashboardcontext);

  const ro = useRouter();
  console.log(ro);
  const query = ro.query;
  const target = query.table?.toLowerCase() || "user";
  const array = display(target);
  function dbquery(url, check = false) {
    axios
      .get(url)
      .then((axiosdata) => {
        let temp_data = axiosdata.data.data;
        if (temp_data.length !== 0) {
          let new_data = [...object[target], ...temp_data];
          object[target] = new_data;
          setpagecount((page) => page + 1);
          setisdata(true); //state
          return;
        }
        if (temp_data.length === 0) {
          setisdata(false);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function adddata(pagenumber) {
    const field = array.join(" ");
    const limit = 7;
    let url = `/api/${target}/getall?filter=${field}&page=${pagenumber}&limit=${limit}`;
    dbquery(url);
  }
  return { adddata, array, target };
}
