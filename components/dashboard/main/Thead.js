export default function Thead({ data }) {
  return (
    <ul className='hidden md:flex justify-evenly text-2xl'>
      <li className='text-xl'>No</li>
      {data?.map((item, i) => {
        return (
          <li key={i} className='text-xl'>
            {item}
          </li>
        );
      })}
      <li>action</li>
    </ul>
  );
}
