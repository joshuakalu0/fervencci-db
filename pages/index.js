import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { Form, Formik } from "formik";
import FormGenerator from "../components/form";
import {
  login_data,
  login_initial,
  login_validationSchema,
} from "../lib/form_data/login_data";
import FormButton from "../components/form/FormButton";
import useLoggedin from "../components/hooks/useLoggedin";
import Loading from "../components/utiles/Loading";
import { useRouter } from "next/router";
import Loaderror from "../components/utiles/Loaderror";
import ErrorPage from "next/error";

export default function Login({ csrfToken }) {
  const [isloading, isloggedin, data] = useLoggedin();
  const [errors, seterrors] = useState([]);
  const ro = useRouter();
  if (isloading == true) return <Loading />;
  return (
    <div className='flex items-center justify-center w-[100vw] h-[100vh] fixed top-0'>
      <div className=' rounded-md p-3 border-2 w-1/2'>
        <Formik
          initialValues={login_initial}
          validationSchema={login_validationSchema}
          onSubmit={(values, actions) => {
            const { email, password } = values;
            const option = { redirect: false, email, password };
            signIn("credentials", option)
              .then((data) => {
                if (data.ok) ro.push("/dashboard");
                if (data.error) seterrors([data.error]);
              })
              .catch((err) => {
                console.log(err, "err");
              });
          }}
        >
          <Form method='post' action='/api/auth/signin'>
            <div className=' p-2 w-full text-gray-500 rounded-md flex flex-col space-y-2 justify-center items-center border-blue-300'>
              <Image
                src={"/client-2.png"}
                alt={"fervencci logo"}
                height={40}
                width={60}
              />
              <h2 className='header text-gray-600'>Login</h2>
            </div>
            <Loaderror errors={errors} />
            <input hidden defaultValue={csrfToken} name='csrfToken' />
            <FormGenerator object={login_data} />
            <FormButton color='primary' variant='outlined' fullWidth>
              login
            </FormButton>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken,
    },
  };
}
