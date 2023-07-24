import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { Dashboardcontext } from "../../../pages/_app";
import Action from "./Action";

export default function Tbody({ filter }) {
  const ro = useRouter();
  const query = ro.query;
  const target = query.table?.toLowerCase() || "user";
  const [data, setdata] = useState([]);
  const [object, setter] = useContext(Dashboardcontext);
  useEffect(() => {
    setdata(object[target]);
  }, [target, object[target]]);

  return (
    <div className='space-y-1'>
      {data?.map((obj, i) => {
        return (
          <ul
            key={i}
            className='border-2 md:flex justify-evenly border-slate-400 rounded-md'
          >
            <li className='flex justify-start text-2xl'>{i + 1}</li>
            {data.length != 0 &&
              filter.map((innerdata, id) => {
                return (
                  <li key={id} className='text-xl'>
                    {obj[innerdata]?.toString()}
                  </li>
                );
              })}
            <Action target={target} id={obj["_id"]} setter={setter} />
          </ul>
        );
      })}
    </div>
  );
}
