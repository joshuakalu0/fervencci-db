import Link from "next/link";

export default function SideElements({ data }) {
  return (
    <div className='flex flex-start  flex-col w-full h-full flex-grow'>
      {data.map((data, i) => {
        return (
          <div
            className='flex justify-center items-center text-xl text-gray-500 hover:bg-[#f3f520] border-b-2 min-h-[6rem] border-blue-300 w-full '
            key={i}
            onClick={(ev) => {
              let element = ev.target.tagName;
              if (element == "DIV") {
                ev.target.childNodes[0]?.click();
              }
            }}
          >
            <div>
              <Link className='w-[100%] h-[100%]' href={`/dashboard/${data}`}>
                {data}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
