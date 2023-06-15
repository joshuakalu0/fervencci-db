import { User } from "./../../db/userModel";
import connectDB from "../../auth/lib/connectDB";
// import { unstable_getServerSession } from "next-auth/next";
// import { authOptions } from "../../auth/[...nextauth]";
connectDB();

export default async function handler(req, res) {
  //   const session = await unstable_getServerSession(req, res, authOptions);
  // if (!session) {
  //   res.status(401).json({ status: "not login " });
  // }
  if (req.method == "DELETE") {
    const dataID = req.query.recordid;
    try {
      const data = await User.findByIdAndDelete(dataID);
      res.status(200).json({ status: "successful", data });
    } catch (error) {
      const erro = requestError(error);
      res.status(400).json({ status: "an error occured", error: erro });
    }
  }
  res.status(405).json({
    status: "Failed",
    error: "invalid method used",
  });
}

function requestError(err) {
  if (err.kind == "ObjectId" && err.path == "_id") {
    return "Delete operation failed, invalid record id";
  }
  return "An Error occured please reload and try again, if persist contact developer";
}
