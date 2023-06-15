import { Add } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import Tbody from "./Tbody";
import Thead from "./Thead";
import Link from "next/link";
import { Dashboardcontext } from "../../../pages/_app";
import useScroll from "../../hooks/useScroll";
import Loading from "../../utiles/Loading";
import useFetcher from "../../hooks/useFetcher";
import useUpdater from "../../hooks/useupdater";

export default function Table() {
  const [scrollposition, hit] = useScroll();
  const [pagecount, setpagecount] = useState(2);
  const [isdata, setisdata] = useState(false);
  const { adddata, array, target } = useFetcher(setisdata, setpagecount);
  // const [] = useUpdater(); // need to be looked into
  const [object, setter] = useContext(Dashboardcontext);

  useEffect(() => {
    if (hit && isdata) {
      adddata(pagecount);
    }
  }, [hit]);
  useEffect(() => {
    if (object[target]?.length >= 5) {
      setpagecount(2);
      setisdata(true);
    } else {
      setisdata(false);
    }
  }, [target]);

  return (
    <section>
      <h1 className='header'>{target}</h1>
      <Button varient={"outlined"} color={"success"}>
        <Link
          className='w-[100%] h-[100%]'
          href={`/dashboard/create/${target}`}
        >
          Add record <Add />
        </Link>
      </Button>
      <div className='tbl-header'>
        <Thead data={array} />
      </div>
      <div className='my-3'>
        <Tbody filter={array} />
      </div>
      <div className='w-full flex justify-center items-center'>
        {hit && isdata && <CircularProgress />}
        {isdata === false && (
          <small className='text-gray-500'>record finished</small>
        )}
      </div>
    </section>
  );
}
