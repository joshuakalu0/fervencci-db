import { Measurement } from "./../../db/measurementModel";
import connectDB from "../../auth/lib/connectDB";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
connectDB();
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb", // Set desired value here
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
    const dataID = req.query.recordid;
    const option = {
      returnDocument: "after",
      new: true,
      runValidators: true,
    };

    try {
      const data = await Measurement.findByIdAndUpdate(
        dataID,
        req.body.body,
        option
      );
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
