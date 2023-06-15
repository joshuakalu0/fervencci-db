export default function Loaderror({ errors }) {
  return (
    <div>
      {errors.length != 0 &&
        errors.map((error, id) => {
          return (
            <div
              key={id}
              className='border-[1px] p-2 w-full  text-red-500 rounded-md inline-flex justify-center items-center border-blue-300'
            >
              <small>{error}</small>
            </div>
          );
        })}
    </div>
  );
}
