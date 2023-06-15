import { Check, Clear } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Dashboardcontext, Globalcontext } from "../../pages/_app";
import { getStorage, ref, deleteObject } from "firebase/storage";
import storage from "../../firebase";

export default function Model({ data, setter }) {
  // const [object,setter] = useContext(Dashboardcontext)
  const [active, setactive] = useState(false);
  const ro = useRouter();
  const query = ro.query;
  const target = query.view || query.page;
  function handleClick(ev) {
    setter((obj) => {
      let temp = { ...obj };
      temp.deleteid = null;
      return temp;
    });
  }
  function handleDelete(ev) {
    let url = `/api/${target}/delete?id=${data.deleteid}`;
    console.log("delet");

    if (target === "report") {
      axios.delete(url).then((res) => {
        ro.push(`/dashboard?page=${target}`);
      });
    } else {
      axios.get(`/api/${target}/get?id=${data.deleteid}`).then((res) => {
        const uuid = res.data.data.uuid;

        const fileRef = ref(storage, `${target}/${uuid}`);
        // Delete the file
        deleteObject(fileRef)
          .then(() => {
            axios.delete(url).then((id) => {
              console.log("file deleted ", id);
              setter((obj) => {
                let temp = { ...obj };
                temp.deleteid = null;
                return temp;
              });
              remover(setter, target, data.deleteid);
              ro.push(`/dashboard?page=${target}`);
            });
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });

        console.log(uuid);
      });
    }

    // axios
    //   .delete(url)
    //   .then((axiosdata) => {

    //
    //     // ro.reload();
    //   })
    //   .catch((err) => {

    //   });
  }
  useEffect(() => {
    if (data.deleteid != null) {
      setactive(true);
    } else if (data.deleteid == null) {
      setactive(false);
    }
  }, [data.deleteid]);

  return (
    <div
      className='bg-[rgb(150,241,2)]  p-3 rounded-md shadow-md flex pb-[1px] justify-start items-center z-[99]  top-[-400px] flex-col fixed'
      id={active && "animate-alert"}
    >
      <div className='w-full border-b-2 border-emerald-400'>
        <h3 className='text-red-600 pl-2'>Delete Alert</h3>
      </div>
      <div className='flex justify-start items-center z-[99] p-3 top-0 flex-col'>
        <p> Are you sure you want to delete record with id</p>
        <p className='flex text-center'>{data.deleteid}</p>
      </div>
      <div className='flex space-x-2 w-full justify-end rounded-md mb-2'>
        <Button variant='contained' onClick={handleClick}>
          Cancel <Clear />
        </Button>

        <Button color='error' variant='contained' onClick={handleDelete}>
          Delete <Check />
        </Button>
      </div>
    </div>
  );
}

function remover(setter, table, id) {
  setter((obj) => {
    return {
      ...obj,
      [table]: obj[table].filter((data) => {
        return data._id !== id;
      }),
    };
  });
}

// Create a reference t`o the file to delete
