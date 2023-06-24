import { useState, useEffect } from "react";
import useLoggedin from "../components/hooks/useLoggedin";
import { CircularProgress } from "@mui/material";
import Loading from "../components/utiles/Loading";
import connectDB from "./api/auth/lib/connectDB";
import { Dashboardcontext } from "./_app";
import { useContext } from "react";
import Sidemenu from "../components/dashboard/side";
import Mainsection from "../components/dashboard/main";
import { Modelfind } from "./api/db";
import { display } from "../lib";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

export default function Dashboard(record_i) {
  const ro = useRouter();
  const [object, setter] = useContext(Dashboardcontext);
  const [isloading, isloggedin, data] = useLoggedin("/");
  if (!ro.isFallback && !record_i) {
    return <ErrorPage statusCode={404} />;
  }
  const page = JSON.parse(record_i.page);
  const record = JSON.parse(record_i.records);
  console.log(data, "dd");
  if (record && record.length !== 0) {
    object[page] = record;
  }
  if (isloading == true) return <Loading />;
  return (
    <div className='flex items-center justify-center w-full h-full relative'>
      <div className='flex flex-row  items-center justify-center w-full h-full'>
        <Sidemenu />
        <Mainsection />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  connectDB();

  let query = "";
  try {
    const query_i = context.query.page;
    query = query_i.toString().toLowerCase();
  } catch (error) {
    query = "user";
  }
  const Model = Modelfind(query);

  const array = display(query);

  const filter = array.join(" ");
  try {
    const data = await Model.find().limit(5).select(filter).sort("-createdAt");
    const count = data.length;
    const more = count === 5 ? true : false;
    const record = {};
    return {
      props: {
        records: JSON.stringify(data),
        page: JSON.stringify(query),
        length: count,
        available: more,
      },
    };
  } catch (error) {
    //  invalid id passed in  or unable to fetch record with id :id
    console.log(error);
  }

  console.log();
  return {
    props: {},
  };
}
