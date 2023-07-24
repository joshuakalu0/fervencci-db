import Actionview from "../../../components/view/Actionview";
import Imgview from "../../../components/view/Imgview";
import Textview from "../../../components/view/Textview";
import connectDB from "../../api/auth/lib/connectDB";
import Rotator from "../../../components/utiles/Back";

// import useLoggedin from "../../../components/hooks/useLoggedin";
import Loading from "../../../components/utiles/Loading";
import ErrorPage from "next/error";
import axios from "axios";

export default function Action(data) {
  const record_i = JSON.parse(data.data);
  const { record, table } = record_i;
  console.log(record, table);
  const fields = Object.keys(record);
  const [isloading, isloggedin, session] = useLoggedin("/");
  console.log(session);
  const premission = session.premission;
  const ro = user;
  if (!ro.isFallback && !data) {
    return <ErrorPage statusCode={404} />;
  }
  if (isloading == true) return <Loading />;
  if (premission !== "staff" || premission !== "admin")
    <Loading text='permission denied' />;
  return (
    <div>
      <div>
        <div>
          <div className='relative mt-[10px]  min-h-[100vh]  w-full'>
            <div className='w-full h-full  relative mb-[20px] '>
              <div className='absolute top-[10px] left-[10px]'>
                <Rotator />
              </div>
              <div className='w-full flex justify-center item-center flex-col'>
                <h2 className='flex justify-center item-center text-4xl '>
                  Welcome to {table} view page
                </h2>
              </div>
              <small className='flex justify-center item-center italic'>
                record id being view: {record["_id"]}
              </small>
            </div>
            {/* start */}
            {fields.map((field, i) => {
              if (typeof record[field] == "object") {
                return <Imgview key={i} header={field} data={record[field]} />;
              }
              if (
                record[field] === record["_id"] ||
                record[field] === record["__v"]
              ) {
                return;
              }
              return <Textview key={i} header={field} data={record[field]} />;
            })}
            {/* end */}
            {/* {(premission === "staff" || premission === "admin") && (
              <Actionview table={table} id={record["_id"]} />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const list = context.params.index;

  if (list[0] && list[1]) {
    console.log(true, "list");
    const tableName = list[0];
    const recordID = list[1];
    const url = `https://fervencciD.onrender.com/api/v1/${tableName}s/${recordID}`;
    console.log(url);
    try {
      const data = await axios.get(url);

      const response = data.data.data;
      const record = {
        record: response,
        table: tableName,
      };
      console.log(response, "data");
      return {
        props: {
          data: JSON.stringify(record),
        },
      };
    } catch (error) {
      return {
        notFound: true,
      };
    }
  }

  return {
    notFound: true,
  };
}
