import SideElements from "./SideElements";
import { useContext } from "react";
import { Dashboardcontext } from "../../../pages/_app";

const side = ["User", "Catalog", "Measurements", "Report"];

function Sidemenu() {
  const [object, setter] = useContext(Dashboardcontext);
  return (
    <div
      className={`${
        !object?.isSideActive && "hidden"
      } side-color relative flex flex-start z-8 top-[-1px] pt-[18px]  md:bg-transparent max-w-[200px]   w-full min-h-[105vh]  `}
    >
      <div
        // hidden={true}
        className='flex flex-start z-8 flex-col bg-black md:bg-transparent border-r-2  pr-[2px] max-w-[200px] border-blue-300 flex-row space-x-1 font-bold w-full min-h-auto  fixed top-[60px] left-0'
      >
        <div className='flex text-xl pb-20  justify-center items-center text-gray-700 '>
          <h3 className='flex text-gray-200'> Tables</h3>
        </div>
        {/* here */}
        <SideElements data={side} />
      </div>
    </div>
  );
}
export default Sidemenu;
