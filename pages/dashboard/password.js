import { Clear, Save } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormGenerator from "../../components/form";
import FormButton from "../../components/form/FormButton";
import connectDB from "../api/auth/lib/connectDB";
import Rotator from "../../components/utiles/Back";
import Link from "next/link";
import {
  password_data,
  password_initial,
  password_validationSchema,
} from "../../lib/form_data/password_data";
import useFetchUpload from "../../components/hooks/useFetchUpload";
import useLoggedin from "../../components/hooks/useLoggedin";
import Loading from "../../components/utiles/Loading";

export default function Action() {
  const ro = useRouter();
  const [issubmitting, setissubmitting] = useState(null);
  const [error, seterror] = useState(null);
  const [upload, setupload] = useState(null);
  const [makeRequest] = useFetchUpload(setissubmitting, setupload);
  const [isloading, isloggedin, data] = useLoggedin("/");
  if (isloading == true) return <Loading />;
  return (
    <div className='w-full h-full  pt-20 '>
      <div className='w-full h-full'>
        <div className='w-full h-full  relative '>
          <div className='absolute top-[-20px] left-[10px]'>
            <Rotator />
          </div>
          <div className='w-full flex justify-center item-center flex-col'>
            <h2 className='flex justify-center item-center text-4xl '>
              Welcome to password {"action"} page
            </h2>
          </div>
          {error !== null && (
            <div className='w-full flex justify-center item-center flex-col'>
              <small className='flex justify-center item-center text-sm text-red-300 '>
                <i>{error.message}</i>
              </small>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className='relative mt-[10px]  min-h-[100vh]  w-full'>
          <div className='px-3 w-full '>
            <Formik
              initialValues={{ ...password_initial }}
              // validationSchema={password_validationSchema}

              onSubmit={(values, actions) => {
                if (values.password !== values.password2) {
                  seterror({
                    source: "client",
                    message: "password don`t match",
                  });
                  return;
                } else {
                  setissubmitting(true);
                  const value = JSON.parse(localStorage.getItem("value"));
                  const details = JSON.parse(localStorage.getItem("details"));
                  value.password = values.password;
                  makeRequest(details, value);
                }
              }}
            >
              <Form>
                <FormGenerator object={password_data} />
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
                    action <Save />
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

// export async function getStaticProps() {
//   const formdata = {
//     data: password_data,
//     inituals: password_initial,
//     schema: password_validationSchema,
//   };

//   return {
//     props: JSON.stringify(formdata),
//   };
// }
