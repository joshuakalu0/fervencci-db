import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Actionview({ table, id }) {
  return (
    <div className='flex space-x-2 justify-end mr-3 mt-3'>
      <Link href={`/dashboard/edit/${table}/${id}`}>
        <Button variant='contained'>
          Edit <Edit />
        </Button>
      </Link>
      <Button color='error' variant='contained'>
        Delete <Delete />
      </Button>
    </div>
  );
}
