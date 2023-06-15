import Image from "next/image";
export default function Imgview({ header, data }) {
  return (
    <div className='px-3 w-full  my-4'>
      <div className='w-full flex flex-col border-[1px] relative border-solid shadow-md shadow-[#e60b09] rounded-md text-gray-800 justify-start'>
        <div className='absolute top-[-13px] left-[20px] inline-flex bg-[#e9d022] px-3 py-1 rounded-md shadow-md shadow-[#ffc52d]'>
          <h3 className='pl-1 font-bold'>{header}</h3>
        </div>
        <div className=' flex justify-center items-center space-x-1 border-2 border-green-400 rounded-md p-2 '>
          {data?.map((img, id) => {
            console.log(img, "img");
            return (
              <div className='file-image' key={id}>
                <Image
                  src={img.toString()}
                  alt='photo'
                  width={120}
                  height={120}
                />
                {/* <img src={img} /> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
