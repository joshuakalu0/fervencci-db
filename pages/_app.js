import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { createContext, useState } from "react";
import { useRouter } from "next/router";
import ImageModel from "../components/utiles_fun/ImageModel";
// import Model from "../components/dashboard/Model";
import Navbar from "../components/utiles/Navbar";

export const Dashboardcontext = createContext();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [maindata, setmaindata] = useState({
    user: [],
    skills: [],
    project: [],
    report: [],
    isSideActive: true,
    displayImages: null,
  });

  function setdisplayImages(value) {
    setmaindata({
      ...maindata,
      displayImages: value,
    });
  }

  return (
    <SessionProvider session={session}>
      <Dashboardcontext.Provider value={[maindata, setmaindata]}>
        <Navbar />
        {maindata.displayImages && (
          <ImageModel data={maindata.displayImages} fun={setdisplayImages} />
        )}
        {/* <Model data={maindata} setter={setmaindata} /> */}
        <Component {...pageProps} />
      </Dashboardcontext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
