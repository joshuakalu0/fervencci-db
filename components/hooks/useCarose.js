import { useEffect, useState } from "react";

export default function useCarose({ list, current }) {
  const [images, setimages] = useState(null);
  const [currentImage, setcurrentImage] = useState(null);
  const [location, setlocation] = useState(null);
  useEffect(() => {
    let len;
    try {
      len = list.length;
    } catch (error) {
      alert("list error");
      return;
    }
    if (typeof len === "number") {
      setimages((lt) => {
        if (lt === null) {
          return [...list];
        } else {
          return lt;
        }
      });
      setlocation(current || 0);
    }
  }, [list]);
  useEffect(() => {
    if (typeof location === "number") {
      let temp = images[location];
      setcurrentImage(temp);
    }
  }, [location]);

  function next() {
    let length = images?.length - 1;
    console.log(length, location);
    if (images.length == 1 && images.length == 1) {
      return;
    }
    if (location == length) {
      setlocation(0);
      return;
    }
    if (location <= length) {
      const newLoc = location + 1;
      setlocation(newLoc);
      return;
    }
  }
  function prev() {
    if (images.length == 1) {
      return;
    }
    let length = images.length - 1;
    if (location == 0 && images.length !== 1) {
      setlocation(length);
      return;
    }
    setlocation(location - 1);
  }
  return { currentImage, next, prev };
}
