import { CircularProgress } from "@mui/material";

export default function Loading({ text }) {
  return (
    <div className='flex items-center justify-center w-full min-h-[70vh] h-full'>
      <div>{text ? text : <CircularProgress />}</div>
    </div>
  );
}
