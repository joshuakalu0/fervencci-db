export default function Textview({ header, data }) {
  return (
    <div className='px-3 w-full my-4'>
      <div className='w-full flex flex-col border-[1px] relative border-solid shadow-md shadow-[#e60b09] rounded-md text-gray-800 justify-start'>
        <div className='absolute top-[-13px] left-[20px] inline-flex bg-[#e9d022] px-3 py-1 rounded-md shadow-md shadow-[#ffc52d]'>
          <h3 className='pl-1 font-bold'>{header}</h3>
        </div>
        <div className='border-2 border-green-400 rounded-md p-2 pt-5 '>
          <p className='text-xl'>
            {data?.toString()}
            {/* {header === "password" ? "HIDDEN" : data?.toString()} */}
          </p>
        </div>
      </div>
    </div>
  );
}
