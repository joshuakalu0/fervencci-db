import { User } from "./../../db/userModel";
import connectDB from "../../auth/lib/connectDB";
connectDB();

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { filter, page, limit } = req.query;

    const skip = (page - 1) * page || 0;
    const recordlimit = limit || 5;

    try {
      const data = await User.find()
        .sort("-createdAt")
        .skip(skip)
        .limit(recordlimit)
        .select(filter);
      res
        .status(200)
        .json({ status: "successful", data, filter, skip, recordlimit });
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
