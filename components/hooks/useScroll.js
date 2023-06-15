import { useEffect, useState } from "react";

export default function useScroll() {
  const [scrollposition, setscrollposition] = useState(null);
  const [hit, sethit] = useState(false);
  const [wait, setwait] = useState(false);
  function handleclickI(ev) {
    setscrollposition(window.scrollY);
  }
  useEffect(() => {
    document.addEventListener("scroll", handleclickI);

    return () => {
      document.removeEventListener("scroll", handleclickI);
    };
  });
  let check = false;
  let time = null;
  useEffect(() => {
    if (wait === false) {
      let height = document.body.offsetHeight - window.innerHeight;
      if (scrollposition >= height - 5) {
        console.log("hit");
        sethit(true);
        setwait(true);
        time = setTimeout(() => {
          setwait(false);
          clearTimeout(time);
        }, 400);
      } else {
        sethit(false);
      }
    }
  }, [scrollposition]);
  return [scrollposition, hit];
}
