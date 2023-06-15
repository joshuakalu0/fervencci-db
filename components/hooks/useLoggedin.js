import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function useLoggedin(url = "/") {
  const [data, setdata] = useState({});
  const [isloading, setisloading] = useState(true);
  const [isloggedin, setisloggedin] = useState(false);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push(url);
      setisloggedin(false);
      setTimeout(() => {
        setisloading(false);
      }, 2000);
    }
    if (session.status === "authenticated") {
      if (router.pathname === url) {
        router.push("/dashboard");
      }
      // if()   //check if data exist first before mking request
      axios
        .get(`/api/user/find?by=email&email=${session.data.user.email}`)
        .then((ev) => {
          let temp = { ...session.data.user };
          temp.image = ev.data.data.photos;
          temp.username = ev.data.data.username;
          temp.premission =
            ev.data.data.is_admin === true
              ? "admin"
              : ev.data.data.is_staff === true
              ? "staff"
              : "read";
          setdata(temp);
          session.details = temp;
          setisloggedin(true);
          setTimeout(() => {
            setisloading(false);
          }, 2000);
        });
    }
  }, [session.status]);
  return [isloading, isloggedin, data];
}
