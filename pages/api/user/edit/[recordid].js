import { User } from "./../../db/userModel";
import connectDB from "../../auth/lib/connectDB";
import bcrypt from "bcrypt";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
connectDB();
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};
export default async function handler(req, res) {
  // const session = await unstable_getServerSession(req, res, authOptions);
  // console.log(session, req.session);
  // if (!session) {
  //   res.status(401).json({ status: "not login " });
  // }

  if (req.method == "PATCH") {
    const body = req.body.body ? req.body.body : req.body;
    console.log(req.body, "djcn");
    const dataID = req.query.recordid;
    const option = {
      returnDocument: "after",
      new: true,
      runValidators: true,
    };

    let salt = await bcrypt.genSalt(10);
    console.log(salt, body.password);
    let newpassword = await bcrypt.hash(body.password, salt);
    body.password = newpassword;
    try {
      const data = await User.findByIdAndUpdate(dataID, body, option);
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
