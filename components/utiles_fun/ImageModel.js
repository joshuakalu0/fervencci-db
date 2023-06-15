import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import useCarose from "../hooks/useCarose";
import Close from "../svg/Close";

export default function ImageModel({ data, fun }) {
  const [isactive, setisactive] = useState(true);
  const { currentImage, next, prev } = useCarose(data);
  return (
    <div
      className={`absolute fixed scale-[100%] top-[-60px] w-[100%] h-[100%] z-[999] bg-[rgba(0,0,0,0.62)] transition ${
        !isactive && " scale-[0%]"
      }`}
    >
      <div className='h-full w-full'>
        <div className='h-[30px] fixed top-3 bg-transparent flex justify-end items-center w-full'>
          <Close
            className='h-8 hover:text-white absolute top-[80px]'
            click={() => {
              setisactive(!isactive);
              const t = setTimeout(() => {
                clearTimeout(t);
                fun(null);
              }, 500);
            }}
          />
        </div>
        <div className='w-full h-[100%] flex justify-center items-center'>
          <div
            className='p-1 m-1 rounded-full hover:bg-gray-500'
            onClick={() => prev()}
          >
            <ChevronLeft fontSize='large' />
          </div>
          <div className='flex flex-grow max-h-[90%] w-auto h-auto max-w-[70%]'>
            <img
              src={`${currentImage}`}
              className='w-full h-auto object-contain rounded-md '
            />
          </div>
          <div
            className='p-1 m-1 rounded-full hover:bg-gray-500'
            onClick={() => next()}
          >
            <ChevronRight fontSize='large' />
          </div>
        </div>
      </div>
    </div>
  );
}
