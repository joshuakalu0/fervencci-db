import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import useLoggedin from "../../hooks/useLoggedin";
export default function Backend() {
  const [isloading, isloggedin, data] = useLoggedin("/");
  useEffect(() => {
    if (isloading === false) {
    }
    console.log(isloading);
  }, [isloading]);

  return (
    <div className='flex flex-end text-center items-center min-w-[10rem]'>
      {/* <div className='flex justify-center items-center relative  w-full'>
        <p className='text-semibold text-gray-500'>Joshua</p>
        <div hidden className='user-nav-options'></div>
      </div> */}
      <div className='group-hover relative flex justify-center items-center relative mx-4 space-x-2 w-full'>
        <div className=' max-h-[40px] max-w-[40px]  rounded-full'>
          <img
            src={isloggedin ? data.image[0] : undefined}
            className=' max-h-[40px] max-w-[40px] object-cover rounded-full'
          />
        </div>
        <p className='hidden sm:flex text-semibold text-gray-500'>
          {isloggedin && data.username}
        </p>
        <div className='opacity-0 group-hover:opacity-1 absolute top-[100%] left-[5px] pt-5 mt-2 bg-gray-200 w-auto rounded-md shadow-md'>
          <p className='hidden p-2 sm:flex text-md font-bold text-gray-500'>
            change password
          </p>
        </div>
        <div className='mx-6'>
          {!isloggedin ? (
            <Button variant='contained' color='primary'>
              <Link href='/login'>Login</Link>
            </Button>
          ) : (
            <Button variant='contained' color='primary'>
              <Link href='/api/auth/signout'>Logout</Link>
            </Button>
          )}
        </div>
        <div hidden className='user-nav-options'></div>
      </div>
    </div>
  );
}
