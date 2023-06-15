import Table from "./Table";
import { useEffect, useContext } from "react";
import { Dashboardcontext } from "../../../pages/_app";
import { RotatorLinkless } from "../../utiles/Back";

function Mainsection() {
  const [object, setter] = useContext(Dashboardcontext);
  function handleclick(action) {
    if (action == "forword") setter({ ...object, isSideActive: true });
    if (action == "backword") setter({ ...object, isSideActive: false });
  }
  useEffect(() => {}, [object.isSideActive]);

  return (
    <div className='relative mt-[10px]  min-h-[100vh]  w-full'>
      <div className='relative top-[-5px] left-[10px] inline-flex cursor-pointer '>
        {object.isSideActive && (
          <RotatorLinkless
            direction={"back"}
            Click={() => handleclick("backword")}
          />
        )}
        {!object.isSideActive && (
          <RotatorLinkless
            direction={"forword"}
            Click={() => handleclick("forword")}
          />
        )}
      </div>
      <div className='w-full'>
        <div className='w-full flex flex-col justify-center items-center text-justify'>
          <h3 className='header-design-font text-4xl text-gray-600 text-center px-3'>
            welcome to Phantom measurement dashboard
          </h3>
        </div>
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
}
export default Mainsection;
