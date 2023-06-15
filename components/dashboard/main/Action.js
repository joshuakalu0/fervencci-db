import { Delete, Edit, Visibility } from "@mui/icons-material";
import Link from "next/link";
import useLoggedin from "../../hooks/useLoggedin";
export default function Action({ target, id, setter }) {
  const [isloading, isloggedin, data] = useLoggedin("/");
  const premission = data.premission;
  return (
    <li className='flex justify-evenly space-x-2'>
      {(premission === "staff" || premission === "admin") && (
        <div className='p-1 rounded-full hover:bg-blue-500 transition-all transition '>
          <Link href={`/dashboard/edit/${target}/${id}`}>
            <Edit />
          </Link>
        </div>
      )}
      <div className='p-1 rounded-full hover:bg-green-500 transition-all transition '>
        <Link href={`/dashboard/view/${target}/${id}`}>
          <Visibility />
        </Link>
      </div>
      {(premission === "staff" || premission === "admin") && (
        <div
          className='p-1 rounded-full hover:bg-red-500 transition-all transition '
          onClick={(ev) =>
            setter((obj) => {
              let temp = { ...obj, deleteid: id };
              return temp;
            })
          }
        >
          <Delete />
        </div>
      )}
    </li>
  );
}
