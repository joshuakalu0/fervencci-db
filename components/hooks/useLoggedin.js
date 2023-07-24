import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
// **needs to be worked on**
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
        router.push("/dashboard/user");
      }
      // if()   //check if data exist first before mking request
      axios
        .get(
          `https://fervencciD.onrender.com/api/v1/users?searchBy=email,${session.data.user.email}`
        )
        .then((ev) => {
          let temp = { ...session.data.user };

          const d = ev.data.data[0];
          temp.image = d.photos;
          temp.username = d.username;
          temp.premission =
            d.is_admin === true
              ? "admin"
              : d.is_staff === true
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
