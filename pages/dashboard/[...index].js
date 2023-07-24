import { Clear, Save } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormGenerator from "../../components/form";
import FormButton from "../../components/form/FormButton";
import useFetchUpload from "../../components/hooks/useFetchUpload";
import { pageIdentify } from "../../components/utiles/pageidentify";
import connectDB from "../api/auth/lib/connectDB";
import Rotator from "../../components/utiles/Back";
import Link from "next/link";

import useLoggedin from "../../components/hooks/useLoggedin";
import Loading from "../../components/utiles/Loading";
import ErrorPage from "next/error";
import axios from "axios";

export default function Action(serverdata) {
  const formdata = JSON.parse(serverdata?.response);
  console.log(formdata);
  const { action, data, inituals, page, schema } = formdata;
  const ro = useRouter();
  const [issubmitting, setissubmitting] = useState(null);
  const [upload, setupload] = useState(null);
  const [makeRequest] = useFetchUpload(setissubmitting, setupload);
  const [isloading, isloggedin, session] = useLoggedin("/");
  console.log(session);
  const premission = session.premission;
  if (!ro.isFallback && !serverdata) {
    return <ErrorPage statusCode={404} />;
  }
  if (isloading == true) return <Loading />;
  if (premission !== "staff" || premission !== "admin")
    return <Loading text='permission denied ☢❌💀💀' />;

  if (serverdata.error) return <h2>{serverdata.error}</h2>;
  return (
    <div className='w-full h-full  pt-20 '>
      <div className='w-full h-full'>
        <div className='w-full h-full  relative '>
          <div className='absolute top-[-20px] left-[10px]'>
            <Rotator />
          </div>
          <div className='w-full flex justify-center item-center flex-col'>
            <h2 className='flex justify-center item-center text-4xl '>
              Welcome to {page} {action} page
            </h2>
          </div>
          {action == "edit" && (
            <small className='flex justify-center item-center italic'>
              record editing id: {inituals._id}
            </small>
          )}
        </div>
      </div>

      <div>
        <div className='relative mt-[10px]  min-h-[100vh]  w-full'>
          <div className='px-3 w-full '>
            <Formik
              initialValues={{ ...inituals }}
              // validationSchema={schema}
              enableReinitialize
              onSubmit={(values, actions) => {
                console.log(values);
                const host = `https://fervencciD.onrender.com/api/v1/${recordDetails.page}`;
                setissubmitting(true);
                const recordDetails = {};
                recordDetails.page = page;
                recordDetails.action = action;
                recordDetails.url = host;

                if (page == "measurement") {
                  let ma = values.material;
                  let de = values.design_choice;
                  values.images = [ma, de];
                  delete values.material;
                  delete values.design_choice;
                }
                if (formdata.action === "create") {
                  recordDetails.id = null;
                  recordDetails.uuid = null;
                } else if (action === "edit") {
                  recordDetails.id = inituals?._id || null;
                  recordDetails.uuid = inituals?.uuid || null;
                  recordDetails.url = `${host}/{inituals?._id}` || null;
                }
                if (page === "user") {
                  localStorage.setItem("value", JSON.stringify(values));
                  localStorage.setItem(
                    "details",
                    JSON.stringify(recordDetails)
                  );
                  ro.push("/dashboard/password");
                } else {
                  makeRequest(recordDetails, values);
                }
              }}
            >
              <Form>
                <FormGenerator object={data} />
                <div className='flex space-x-2 justify-end mr-3 mt-3'>
                  <div className='flex space-x-2 justify-end mr-3 mt-3'>
                    {issubmitting && <CircularProgress />}

                    <Button
                      color='success'
                      onClick={() => setissubmitting(false)}
                      variant='contained'
                    >
                      CANCEL <Clear />
                    </Button>
                  </div>

                  <FormButton nofull={true} processing={issubmitting}>
                    {action} <Save />
                  </FormButton>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const list = context.params.index;

  // [edit,table,id]
  // [0,1,2]

  const page_i = pageIdentify(list);
  if (list[2]) {
    // if id is passed in
    const filter = Object.keys(page_i.inituals).join(" ");

    try {
      const url = `https://fervencciD.onrender.com/api/v1/${list[1]}s/${list[2]}`;
      const data = await axios.get(url);
      console.log(url);
      const count = data.data.length;
      const response = data.data.data;
      console.log(response, "data");

      page_i.inituals = response;
      return {
        props: {
          response: JSON.stringify(page_i),
          // page: "",
        },
      };
    } catch (error) {
      console.log(error, "err");
      return {
        props: {
          error: "invalid id passed in the url",
        },
      };
    }
  } else if (list[0] === "create" || list[0] === "edit") {
    return {
      props: {
        response: JSON.stringify(page_i),
        // page: "",
      },
    };
  }
}
