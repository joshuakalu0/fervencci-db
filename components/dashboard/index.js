import Editmeun from "./edit";
import Mainsection from "./main";
import Sidemenu from "./side";
import Viewmeun from "./view";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { Dashboardcontext } from "../../pages/dashboard";

export default function DashBoard() {
  const [object, setter] = useContext(Dashboardcontext);
  const route = useRouter();
  const query = route.table;
  useEffect(() => {}, [object.page]);

  return (
    <div className='flex flex-row  items-center justify-center w-full h-full'>
      <Sidemenu />
      <Page query={query} />
    </div>
  );
}

function Page({ query }) {
  if (query.page) {
    return <Mainsection />;
  }
  if (query.edit || query.create) {
    return <Editmeun />;
  }
  if (query.view) {
    return <Viewmeun />;
  }
  return <Mainsection />;
}
