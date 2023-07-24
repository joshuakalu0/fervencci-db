import { useState, useEffect, use } from "react";
import useLoggedin from "./../../../components/hooks/useLoggedin";
import { CircularProgress } from "@mui/material";
import Loading from "./../../../components/utiles/Loading";
import { Dashboardcontext } from "./../../_app";
import { useContext } from "react";
import Sidemenu from "./../../../components/dashboard/side";
import Mainsection from "./../../../components/dashboard/main";
import { display } from "./../../../lib";
import axios from "axios";
// import { Modelfind } from "../../api/db";
import connectDB from "../../api/auth/lib/connectDB";

export default function Dashboard({ records, pages }) {
  const record = JSON.parse(records);
  const page = JSON.parse(pages);
  console.log(record, page);
  const [object, setter] = useContext(Dashboardcontext);
  const [isloading, isloggedin, data] = useLoggedin("/");
  console.log(data);
  if (record && record.length !== 0) {
    object[page] = record;
  }
  // if (isloading == true) return <Loading />;
  return (
    <div className='flex items-center justify-center w-full h-full relative'>
      <div className='flex flex-row  items-center justify-center w-full h-full'>
        <Sidemenu />
        <Mainsection />
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const query = params.table.toString().toLowerCase();
  const limit = 10;
  const array = display(query);
  const filter = array.join(",");
  const url = `https://fervencciD.onrender.com/api/v1/${query}s?limit=${limit}&fields=${filter}`;

  try {
    const data = await axios.get(url);
    const count = data.data.length;
    const response = data.data.data;
    console.log(response, "data");
    const more = true;
    return {
      props: {
        records: JSON.stringify(response),
        pages: JSON.stringify(query),
        length: count,
      },
    };
  } catch (error) {
    //  invalid id passed in  or unable to fetch record with id :id
    console.log(error, "error");
    return {
      notFound: true,
    };
  }

  console.log();
  return {
    props: {},
  };
}
export async function getStaticPaths() {
  const table = ["user", "catalog", "report", "measurement"];
  const path = table.map((ev) => {
    return {
      params: { table: ev },
    };
  });

  return {
    paths: path,
    fallback: true,
  };
}
